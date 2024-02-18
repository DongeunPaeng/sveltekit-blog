<svelte:head>
	<title>Dongeun Paeng | Login</title>
</svelte:head>

<div class="login">
	<form method="POST">
		<div id="email">
			<label id="email-label">
				<span>Email</span>
				<input name="email" type="email" />
			</label>
		</div>
		<div id="password">
			<label id="password-label">
				<span>Password</span>
				<input name="password" type="password" />
			</label>
		</div>
		<div id="login_button">
			<button>Log in</button>
		</div>
	</form>
</div>

<style>
	* {
		max-width: 600px;
		font-family: 'Times New Roman', Times, serif;
	}
	#email,
	#password,
	#login_button {
		background-color: aqua;
		margin-top: 1rem;
	}
	#email-label,
	#password-label {
		width: 100%;
	}
</style>
