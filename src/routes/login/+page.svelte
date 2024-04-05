<script>
	export let form;
</script>

<svelte:head>
	<title>Dongeun Paeng | Login</title>
</svelte:head>

<!-- TODO: cf. page.server.ts -->
<div class="min-h-screen flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-md w-full space-y-8">
		<h2 class="text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
		<div>
			<form method="post" class="mt-8 space-y-6" action="?/login">
				<div class="rounded-md -space-y-px">
					<div>
						<label for="email" class="sr-only">Email address</label>
						<input
							id="email"
							required
							class="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
							placeholder="Email address"
							type="text"
							name="email"
						/>
					</div>
					<div>
						<label for="password" class="sr-only">Password</label>
						<input
							id="password"
							required
							class="mb-1 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
							placeholder="Password"
							type="password"
							name="password"
						/>
						{#if form?.incorrect}<div class="ml-3 mt-2 mb-6 text-red-500 text-xs">
								입력하신 정보가 올바르지 않아요.
							</div>
						{:else}
							<div class="ml-3 mt-2 mb-6 text-red-500 text-xs" />
						{/if}
					</div>
					<div>
						<button
							id="login-btn"
							type="submit"
							class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
						>
							<span class="absolute left-0 inset-y-0 flex items-center pl-3">
								<svg
									class="h-5 w-5"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="rgb(107 114 128 / var(--tw-text-opacity))"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
										clip-rule="evenodd"
									/>
								</svg>
							</span>
							Sign In
						</button>
						<p class="mt-2 text-center text-sm text-gray-600">
							Forgot your password?{' '}
							<a href="/find-password" class="font-medium text-gray-600 hover:text-gray-500">
								Find Password
							</a>
						</p>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>

<style>
	#login-btn:hover svg {
		fill: rgb(156 163 175 / var(--tw-text-opacity));
	}
</style>
