<!-- LoadingSpinner.svelte -->
<div class="spinner-overlay">
	<div class="spinner">
		<div class="bounce1"></div>
		<div class="bounce2"></div>
		<div class="bounce3"></div>
	</div>
</div>

<style>
    .spinner-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
    }

    .spinner {
        width: 40px;
        height: 40px;
    }

    .spinner > div {
        background-color: #4b5563;
        width: 25%;
        height: 25%;
        border-radius: 50%;
        display: inline-block;
        animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    }

    .bounce1 {
        animation-delay: -0.32s;
    }

    .bounce2 {
        animation-delay: -0.16s;
    }

    @keyframes sk-bouncedelay {
        0%, 80%, 100% {
            transform: scale(0);
        }
        40% {
            transform: scale(1.0);
        }
    }
</style>