import * as d3 from 'd3'

export default class BaseChart {
    constructor(chartName, divId, margin = undefined) {
        if (margin) {
            this.margin = margin
        } else {
            this.margin = {
                top: 5,
                right: 5,
                bottom: 5,
                left: 5
            }
        }

        this.parent = d3.select(`#${divId}`)
        this.svg = this.parent
            .append('svg')
            .attr('id', `${divId}-${chartName}`)
            .attr('width', '100%')
            .attr('height', '100%')

        this.resizeListener = () => {
            this._sizeArea()
            // Set a flag for resizing, so we don't just transition everything on resize
            this._draw(true)
        }
        window.addEventListener('resize', this.resizeListener)

        // Initialise chart group and translate to left/top margin
        this.chartArea = this.svg.append('g')
            .attr('transform', `translate(${this.margin.left},${this.margin.top})`)
    }

    show() {
        this.parent.style('display', 'block')
        this.resizeListener()
    }

    hide() {
        this.parent.style('display', 'none')
    }

    dispose() {
        window.removeEventListener('resize', this.resizeListener)
    }

    _sizeArea() {
        // Width and height ignore the margins. Since graph area has already been translated, we can just treat this.graphArea as a canvas of this width/height
        this.width = this.svg.node().getBoundingClientRect().width -
            this.margin.left -
            this.margin.right
        this.height = this.svg.node().getBoundingClientRect().height -
            this.margin.top -
            this.margin.bottom
        this.chartArea
            .attr('transform', `translate(${this.margin.left},${this.margin.top})`)
    }

    _draw(resize = false) {
        if (!this.data) {
            return
        }
    }
}
