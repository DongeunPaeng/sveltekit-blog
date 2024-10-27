<div class="spinner">
	<div class="bounce1"></div>
	<div class="bounce2"></div>
	<div class="bounce3"></div>
</div>

<style>
    .spinner {
        display: inline-block;
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

    .spinner .bounce1 {
        animation-delay: -0.32s;
    }

    .spinner .bounce2 {
        animation-delay: -0.16s;
    }

    @keyframes sk-bouncedelay {
        0%,
        80%,
        100% {
            transform: scale(0);
        }
        40% {
            transform: scale(1.0);
        }
    }
</style>