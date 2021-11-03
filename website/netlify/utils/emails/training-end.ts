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
		}

		/* Main */
		.main {
			flex-grow: 1;
			padding: 2rem;
		}
		.main h1 {
			font-size: 2.5rem;
			line-height: 1;
		}
		.button-container {
			margin-top: 16px;
		}
		.comp-button {
			display: inline-block;
			padding: 3px 10px;
			background: #53a7ee;
			color: #ffffff !important;
			border-radius: 100px;
			text-decoration: none;

			font-size: 12px;
			font-weight: 400;
      	}

		/* Footer */
		footer {
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
			color: currentColor !important;
			text-decoration: none !important;
		}
		* {
			text-align: center;
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
			<div class="button-container">
				<a class="comp-button" href="${process.env.GRIDSOME_BASE_URL}/training/${trainingId}">Click to view</a>
			</div>
		</div>
		<footer>
			<a href="https://www.aporia.com?utm_source=mlnotify&utm_medium=email&utm_campaign=+mlnotify" target="_blank" class="made-with-love" >
				Made with ❤️ by <img class="aporia-logo" src="${process.env.GRIDSOME_BASE_URL}/static-assets/aporia.png" alt="Aporia" />
				</a>
		</footer>
	</body>
</html>
`
