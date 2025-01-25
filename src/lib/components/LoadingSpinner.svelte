<div class="loading-overlay">
	<p class="loading-quote">
		서두르지 마세요. 멀리 내다보세요.
	</p>
</div>

<style>
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        display: flex;
        align-items: center;
        justify-content: center;

        background-color: rgba(255, 255, 255, 0.5);
        pointer-events: none;
        z-index: 9999;
    }

    .loading-quote {
        font-size: 1rem;
        font-weight: 600;
        color: black; /* 예: Tailwind 색상코드 (Gray-700) */
        text-align: center;
        padding-bottom: 10rem;
        border-radius: 8px;
    }
</style>