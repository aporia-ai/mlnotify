export const createTrainingEndEmail = ({ trainingId }: { trainingId: string }) => /*html*/ `
<html>
	<head>
		<title>MLNotify | Training #${trainingId} ended</title>
		    <link
      href="https://fonts.googleapis.com/css2?family=Heebo&display=swap"
      rel="stylesheet"
    />
    <style>
		/* Body */
		body {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			min-height: 100%;
			font-family: Heebo, sans-serif;
			color: rgb(38, 42, 51);
		}

		/* Header */
		header {
			background: rgba(38, 42, 51);
			padding: 0.5rem 2.5rem;
			text-align: center;
		}

		/* Main */
		.main {
			flex-grow: 1;
			padding: 2rem;
		}
		.main h1 {
			text-align: center;
			font-size: 2.5rem;
			line-height: 1;
		}
		.main h4 {
			text-align: center;
			line-height: 1;
		}

		/* Footer */
		footer {
		    text-align: center;
			color: rgba(113, 124, 137);
			flex-grow: 0;
			padding: 0.5rem;
		}
		.made-with-love {
		    text-decoration: none !important;
		    color: currentColor !important;
		}

		footer .aporia-logo {
			height: 1.25rem;
			margin-left: 0.5rem;
			vertical-align: middle;
		}

		/* Reset */
		body,
		html {
			margin: 0;
			padding: 0;
		}
		a {
			color: currentColor;
		}
		* {
			box-sizing: border-box;
		}
	</style>
	</head>
	<body>
		<header>
			<a class="logo" href="${process.env.GRIDSOME_BASE_URL}" target="_blank">
				<img src="${process.env.GRIDSOME_BASE_URL}/static-assets/logo-with-text.png">
			</a>
		</header>
		<div class="main">
			<h1>Training #${trainingId} ended</h1>
			<h4>Click <a href="${process.env.GRIDSOME_BASE_URL}/training/${trainingId}">here</a> to go to training page</h4>
		</div>
		<footer>
			<a href="https://aporia.com" target="_blank" class="made-with-love" >
				Made with ❤️ by <img class="aporia-logo" src="${process.env.GRIDSOME_BASE_URL}/static-assets/aporia.png" />
				</a>
		</footer>
	</body>
</html>
`
