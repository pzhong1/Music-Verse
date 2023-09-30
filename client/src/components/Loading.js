// Loading.js
import React from 'react';
import '../styles/Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
<svg class="pl" viewBox="0 0 128 128" width="128px" height="128px">
	<defs>
		<linearGradient id="pl-grad" x1="0" y1="0" x2="1" y2="1">
			<stop offset="0%" stop-color="#000" />
			<stop offset="100%" stop-color="#fff" />
		</linearGradient>
		<mask id="pl-mask">
			<rect x="0" y="0" width="128" height="128" fill="url(#pl-grad)" />
		</mask>
	</defs>
	<g stroke-linecap="round" stroke-width="8" stroke-dasharray="32 32">
		<g stroke="hsl(193,90%,50%)">
			<line class="pl__line1" x1="4" y1="48" x2="4" y2="80" />
			<line class="pl__line2" x1="19" y1="48" x2="19" y2="80" />
			<line class="pl__line3" x1="34" y1="48" x2="34" y2="80" />
			<line class="pl__line4" x1="49" y1="48" x2="49" y2="80" />
			<line class="pl__line5" x1="64" y1="48" x2="64" y2="80" />
			<g transform="rotate(180,79,64)">
				<line class="pl__line6" x1="79" y1="48" x2="79" y2="80" />
			</g>
			<g transform="rotate(180,94,64)">
				<line class="pl__line7" x1="94" y1="48" x2="94" y2="80" />
			</g>
			<g transform="rotate(180,109,64)">
				<line class="pl__line8" x1="109" y1="48" x2="109" y2="80" />
			</g>
			<g transform="rotate(180,124,64)">
				<line class="pl__line9" x1="124" y1="48" x2="124" y2="80" />
			</g>
		</g>
		<g stroke="hsl(283,90%,50%)" mask="url(#pl-mask)">
			<line class="pl__line1" x1="4" y1="48" x2="4" y2="80" />
			<line class="pl__line2" x1="19" y1="48" x2="19" y2="80" />
			<line class="pl__line3" x1="34" y1="48" x2="34" y2="80" />
			<line class="pl__line4" x1="49" y1="48" x2="49" y2="80" />
			<line class="pl__line5" x1="64" y1="48" x2="64" y2="80" />
			<g transform="rotate(180,79,64)">
				<line class="pl__line6" x1="79" y1="48" x2="79" y2="80" />
			</g>
			<g transform="rotate(180,94,64)">
				<line class="pl__line7" x1="94" y1="48" x2="94" y2="80" />
			</g>
			<g transform="rotate(180,109,64)">
				<line class="pl__line8" x1="109" y1="48" x2="109" y2="80" />
			</g>
			<g transform="rotate(180,124,64)">
				<line class="pl__line9" x1="124" y1="48" x2="124" y2="80" />
			</g>
		</g>
	</g>
</svg>
    </div>
  );
};

export default Loading;
