if (typeof(require) === 'function') var ResizeSensor = require("css-element-queries/src/ResizeSensor");

/**
 * @author Albin Eriksson https://github.com/kezoponk
 * @license MIT https://opensource.org/licenses/MIT
 */
class AnimatedScroller {
	resetAnimation() {
		if(this.options.direction === 'left') {
			const itemOutsideView = this.Items[0];
			this.movingpart.appendChild(itemOutsideView.cloneNode(true));
			this.movingpart.removeChild(itemOutsideView);

		} else {
			const itemOutsideView = this.Items[this.Items.length -1];
			this.movingpart.prepend(itemOutsideView.cloneNode(true));
			this.movingpart.removeChild(itemOutsideView);
		}

		this.makeAnimation();
	}

	makeAnimation (start = this.options.direction === 'left' ? 0 : 0 - this.Items[0].offsetWidth) {
		
		// Same as start but reversed
		const end = this.options.direction === 'left' ? 0 - this.Items[0].offsetWidth : 0;
		const animationDuration = 1000 * Math.abs(end - start) / this.options.speed;

		this.movingpart.style.left = start +'px';
		this.movingpart.style.transition = 'none';

		// Required for dom to update before next command
		this.movingpart.offsetLeft;

		this.movingpart.style.left = end +'px';
		this.movingpart.style.transition = `left ${animationDuration}ms ${this.options.animation}`;

		// When transition/animation is finished, move item to the end of the line & reset animation
		this.nextAnimationReset = setTimeout(() => this.resetAnimation(), animationDuration + this.options.delay);

	}
	
	pause() {
		clearTimeout(this.nextAnimationReset);
		
		if (!this.options.finishAnimationBeforePause) {
			this.movingpart.style.left = this.movingpart.offsetLeft +'px';
			this.movingpart.style.transition = 'none';
		}
	}
	
	unpause() {
		const start = this.movingpart.offsetLeft;
		this.makeAnimation(start);
	}

	/** Restore target div to state before scroller implementation */
	restore() {
		this.movingpart.style.transition = 'none';

		this.parentDiv.removeChild(this.movingpart);

		Object.entries(this.initialMovingPart.children).forEach(([index, item]) => this.parentDiv.appendChild(item));

		this.resizesensor.detach();
	}

	initialize(itemsTotalWidth, largestItem) {
		// Reset movingpart to remove supplemental buttons
		if (typeof this.movingpart !== 'undefined') this.parentDiv.removeChild(this.movingpart);
		this.movingpart = this.initialMovingPart.cloneNode(true);

		this.movingpart.style.left = '0px';
		this.movingpart.style.transition = 'none';

		this.parentDiv.appendChild(this.movingpart);
		this.Items = this.movingpart.children;

		if (this.Items.length === 0) throw new Error('Target div empty');
		
		// If the total width of all items in movingpart div is less than parent div then append clones of items until div is filled
		let index = 0;
		while (itemsTotalWidth <= this.parentDiv.offsetWidth + largestItem) {
			const clone = this.Items[index].cloneNode(true);
			this.movingpart.appendChild(clone);
			itemsTotalWidth += this.Items[index].offsetWidth;
			index++;
		}
		
		this.movingpart.style.width = itemsTotalWidth +'px';
	}

	/**
	 * @param {string} parentIdentifier id or class of div containing elements you want to scroll
	 * @param {Object} options { speed, direction, animation, delay, finishAnimationBeforePause }
	 */
	constructor(parentIdentifier, options) {
		options.animation = options.animation || 'ease-in-out';
		options.delay = options.delay || 0;
		this.options = options;

		this.parentDiv = document.querySelector(parentIdentifier);
		this.parentDiv.style.overflow = 'hidden';

		// Move items from target/parent div to initialMovingPart & calculate how many items is required to fill parent div width
		this.initialMovingPart = document.createElement('div');
		this.initialMovingPart.style.position = 'relative';

		let initialTotalWidth = 0, largestItem = 0;

		Object.entries(this.parentDiv.children).forEach(([index, item]) => {
			item.style.position = 'relative';

			const currentItemWidth = item.offsetWidth;
			initialTotalWidth += currentItemWidth;

			if (currentItemWidth > largestItem) {
			largestItem = currentItemWidth;
			}

			this.initialMovingPart.appendChild(item);
		});

		// Finish calculating width required, add/remove items to fill parent div width
		this.initialize(initialTotalWidth, largestItem);

		// Redo when div size changes
		this.resizesensor = new ResizeSensor(this.parentDiv, () => {
			this.initialize(initialTotalWidth, largestItem);
		});

		// Pause movement when mouse is over
		this.parentDiv.addEventListener('mouseover', () => {
			this.pause();
		});
		this.parentDiv.addEventListener('mouseleave', () => {
			this.unpause();
		});

		// Finally begin movement after dom update
		setTimeout(() => this.makeAnimation(), 100);
	}
}

if (typeof(module) === 'object') module.exports = AnimatedScroller;
