<template>
	<div class="flex-1 flex flex-col">
		<!-- Notifications permission bar -->
		<div
			class="bg-blue-1 transition-all text-white-0 h-0 flex justify-center items-center overflow-hidden text-center"
			:class="{ 'h-14': shouldShowNotificationsBar }"
		>
			<div v-if="notificationPermission === 'default'">
				<span class="font-bold">MLNotify</span> needs your permission to
				<button class="underline" @click="askForNotificationPermission">enable desktop notifications</button>
			</div>
			<div v-if="notificationPermission === 'denied'">
				Please
				<a class="underline" href="https://support.google.com/chrome/answer/3220216" target="_blank"
					>enable notifications in your browser</a
				>
				to be notified when your training is over
			</div>
		</div>
		<Transition name="fade" mode="out-in">
			<main v-if="!!training.startedAt" class="p-4 flex-1 flex flex-col justify-around">
				<div>
					<h1 class="font-orelega text-center md:text-6xl text-3xl mb-2 md:mb-4">
						<transition name="fade" mode="out-in">
							<span v-if="!trainingFinished" key="in-progress">
								Waiting for training #{{ trainingId }} to complete
							</span>
							<span v-else key="training-finished">All Done!</span>
						</transition>
					</h1>
					<h2 class="md:text-base text-sm text-center mb-10 px-4">
						<transition name="fade" mode="out-in">
							<span v-if="!trainingFinished" key="in-progress">
								When fit() is completed, a notification will be raised.<br />
								<span class="hidden sm:inline">
									In the meantime, you can have coffee&nbsp;&nbsp;☕, play
									<a
										class="text-blue-1 whitespace-nowrap"
										href="https://github.com/aporia-ai/TrainInvaders"
										target="_blank"
										@click="goTo('https://github.com/aporia-ai/TrainInvaders')"
										>Train Invaders 👾</a
									>, or
									<a
										class="text-blue-1 whitespace-nowrap"
										href="https://www.aporia.com/blog/"
										target="_blank"
										@click="goTo('https://www.aporia.com/blog/?utm_source=mlnotify&utm_medium=inhouse_application&utm_campaign=+mlnotify')"
										>read something 📖</a
									>
								</span>
							</span>
							<span v-else key="training-finished">
								Your training is finished.<br />
								The training finished {{ dayjs(training.endedAt).from(now.time) }} and took
								{{ totalTrainingDuration }}.</span
							>
						</transition>
					</h2>
				</div>
				<div class="flex justify-center items-center">
					<!-- Left -->
					<transition name="fade-left">
						<form
							v-if="!trainingFinished"
							class="hidden lg:flex px-14 py-7 circle-side-section bg-white-0 h-52 w-84 left-section flex-col justify-between items-center"
							@submit.prevent="submitEmail"
						>
							<div class="text-lg text-grey-1">Get notified by email</div>
							<div>
								<input
									v-model="email"
									:disabled="isSubmittingEmail"
									class="email-input py-2 px-4 bg-grey-5 rounded-lg invalid:px-6"
									type="email"
									autocomplete="email"
									placeholder="Email Address"
								/>
							</div>
							<div>
								<button
									class="bg-blue-1 text-white-0 rounded-3xl py-1 px-6 h-9 w-24 flex justify-center items-center text-center"
									@submit.prevent="submitEmail"
								>
									<transition name="fade" mode="out-in">
										<span v-if="!isSubmittingEmail">Submit</span>
										<TailSpinLoader v-else />
									</transition>
								</button>
							</div>
						</form>
					</transition>
					<!-- Circle -->
					<div
						class="max-h-full max-w-full circle-container z-10 bg-white-0 relative flex justify-center xl:w-120 xl:h-120 sm:w-96 sm:h-96 h-72 w-72 items-center rounded-full"
					>
						<!-- Spinner -->
						<CircleLoader
							class="z-0 h-full w-full absolute"
							:class="{ 'circle-loader-success': trainingFinished }"
						></CircleLoader>

						<!-- Dashed circle -->
						<CircleCounter
							class="z-0 absolute rounded-full"
							:dash-count="60"
							:active-count="trainingFinished ? 60 : timer.displayedTime.seconds"
							v-bind="trainingFinished ? { activeStroke: 'rgba(72, 207, 173, 1)' } : {}"
						></CircleCounter>

						<!-- Inner circle -->
						<div class="circle z-10 rounded-full flex justify-center items-center text-center">
							<transition name="fade" mode="out-in">
								<SuccessConfetti v-if="trainingFinished" />
								<div v-else class="flex">
									<div>
										<div class="font-orelega sm:text-6xl text-4xl w-12">
											{{ (timer.displayedTime.hours + '').padStart(2, '0') }}
										</div>
										<div class="text-blue-1 sm:text-base text-xs">hours</div>
									</div>
									<div class="font-orelega sm:text-6xl text-3xl sm:mx-3 mx-1">:</div>
									<div>
										<div class="font-orelega sm:text-6xl text-4xl w-12">
											{{ (timer.displayedTime.minutes + '').padStart(2, '0') }}
										</div>
										<div class="text-blue-1 sm:text-base text-xs">minutes</div>
									</div>
									<div class="font-orelega sm:text-6xl text-3xl sm:mx-3 mx-1">:</div>
									<div>
										<div class="font-orelega sm:text-6xl text-4xl w-12">
											{{ (timer.displayedTime.seconds + '').padStart(2, '0') }}
										</div>
										<div class="text-blue-1 sm:text-base text-xs">seconds</div>
									</div>
								</div>
							</transition>
						</div>
					</div>
					<!-- Right -->
					<transition name="fade-right">
						<div
							v-if="!trainingFinished"
							class="hidden lg:flex px-14 py-7 bg-white-0 circle-side-section right-section h-52 w-84 flex-col justify-between items-center"
						>
							<div class="text-lg text-grey-1">Share to another device</div>
							<div class="flex justify-between items-center">
								<img :src="phoneBarcodeImg" class="mr-3" />
								<DoubleArrowLeftIcon class="mr-3" />
								<Qrcode :size="85" :value="url"></Qrcode>
							</div>
						</div>
					</transition>
				</div>
				<!-- Bottom (mobile only) -->
				<div class="mt-4">
					<div v-if="!trainingFinished" class="text-center p-4">
						<div class="mb-8 sm:hidden text-xs">
							In the meantime, you can have <span class="whitespace-nowrap">coffee ☕</span>, play
							<a
								class="text-blue-1 whitespace-nowrap"
								href="https://github.com/aporia-ai/TrainInvaders"
								target="_blank"
								@click="goTo('https://github.com/aporia-ai/TrainInvaders')"
								>Train Invaders 👾</a
							>, or
							<a
								class="text-blue-1 whitespace-nowrap"
								href="https://github.com/aporia-ai/TrainInvaders"
								target="_blank"
								@click="goTo('https://github.com/aporia-ai/TrainInvaders')"
								>read something 📖</a
							>
						</div>
						<form
							class="text-sm md:text-lg flex lg:hidden flex-col justify-between items-center"
							@submit.prevent="submitEmail"
						>
							<div class="mb-3 md:mb-6">Get notified by email</div>
							<div>
								<input
									v-model="email"
									:disabled="isSubmittingEmail"
									class="email-input py-2 px-4 bg-grey-5 rounded-3xl mb-3 md:mb-6 w-56 md:w-80"
									type="email"
									autocomplete="email"
									placeholder="Email Address"
								/>
							</div>
							<div>
								<button
									class="bg-blue-1 text-white-0 rounded-3xl py-1 px-6 h-8 w-24 flex justify-center items-center text-center"
									@submit.prevent="submitEmail"
								>
									<transition name="fade" mode="out-in">
										<span v-if="!isSubmittingEmail">Submit</span>
										<TailSpinLoader2 v-else />
									</transition>
								</button>
							</div>
						</form>
					</div>
				</div>
			</main>
			<div v-else class="p-4 flex-1 flex flex-col justify-around items-center">
				<DotLoader />
			</div>
		</Transition>

		<NotificationDialog
			v-model="isNotificationDialogOpen"
			@close="isNotificationDialogOpen = false"
			@approve="
				isNotificationDialogOpen = false
				askForNotificationPermission()
			"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

import NotificationDialog from '../../components/NotificationDialog.vue'
import CircleCounter from '../../components/CircleCounter.vue'
import CircleLoader from '../../assets/loaders/spinning-circle-loader.svg'
import DotLoader from '../../assets/loaders/dot-loader.svg'
import TailSpinLoader from '../../assets/loaders/tail-spin-loader.svg'
import TailSpinLoader2 from '../../assets/loaders/tail-spin-loader-2.svg'
import DoubleArrowLeftIcon from '../../assets/icons/double-arrow-left.svg'
import phoneBarcodeImg from '../../assets/icons/phone-barcode.png'
import { firebaseMessagingService } from '../../services/firebase'
import Qrcode from 'qrcode.vue'

import { apiService } from '../../services/api'
import SuccessConfetti from '../../components/SuccessConfetti.vue'

// Dayjs
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration.js'
import relativeTime from 'dayjs/plugin/relativeTime.js'
dayjs.extend(duration)
dayjs.extend(relativeTime)

export default Vue.extend({
	name: 'Training',
	components: {
		NotificationDialog,
		Qrcode,
		CircleCounter,
		CircleLoader,
		DoubleArrowLeftIcon,
		SuccessConfetti,
		DotLoader,
		TailSpinLoader,
		TailSpinLoader2,
	},
	data() {
		return {
			dayjs,
			email: '',
			phoneBarcodeImg,
			isSubmittingEmail: false,
			isInitializingNotifications: true,
			isNotificationDialogOpen: false,
			notificationPermission: null as string | null,
			firebaseMessagingUnsubscribeFunction: null as (() => void) | null,
			url: typeof window !== 'undefined' ? window.location.href : '',
			fetchTrainingIntervalToken: null as any,
			training: {
				startedAt: '',
				endedAt: '',
			} as { startedAt: string; endedAt?: string },
			now: {
				time: Date.now(),
				intervalToken: null as any,
			},
			timer: {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				intervalToken: null as any,
				displayedTime: {
					seconds: 0,
					minutes: 0,
					hours: 0,
				},
			},
		}
	},
	computed: {
		trainingId(): string {
			return (this.$route.params.trainingId || '') as string
		},
		trainingFinished(): boolean {
			return !!this.training.endedAt
		},
		shouldShowNotificationsBar(): boolean {
			return (
				!(this.notificationPermission === 'granted') &&
				!this.isNotificationDialogOpen &&
				!this.isInitializingNotifications
			)
		},
		totalTrainingDuration(): string {
			return dayjs(this.training.startedAt).to(this.training.endedAt, true)
		},
	},
	async mounted(): Promise<void> {
		this.notificationPermission = firebaseMessagingService.getNotificationPermissionStatus()
		this.now.intervalToken = setInterval(() => (this.now.time = Date.now()), 30 * 1000)

		if (!this.trainingId) {
			this.$router.replace('/')
			return
		}

		try {
			await this.fetchTraining()
		} catch (e) {
			this.$router.replace('/')
			this.$toast.open({
				message: 'Training does not exist',
				type: 'error',
			})
			return
		}
		this.startTrainingUpdates()
		this.checkNotificationPermission()
		this.initTimer()
	},
	destroyed() {
		if (this.fetchTrainingIntervalToken) {
			clearInterval(this.fetchTrainingIntervalToken)
		}
		if (this.now.intervalToken) {
			clearInterval(this.now.intervalToken)
		}
		if (this.firebaseMessagingUnsubscribeFunction) {
			this.firebaseMessagingUnsubscribeFunction()
		}
	},
	methods: {
		goTo(url: string) {
			this.$gtag.event('click', {
				event_category: 'outbound',
				event_label: url,
				transport_type: 'beacon',
			})
		},
		async startTrainingUpdates() {
			// If service worker or message listener did not register, fallback to interval
			this.fetchTrainingIntervalToken = setInterval(() => {
				if (this.trainingFinished) clearInterval(this.fetchTrainingIntervalToken)
				else this.fetchTraining()
			}, 2 * 1000)

			// Register service worker
			await this.$store.dispatch('initServiceWorker')

			// Add a message listener
			this.firebaseMessagingUnsubscribeFunction = await firebaseMessagingService.onMessage(payload => {
				if (payload.data.id === this.trainingId) {
					this.training.endedAt = payload.data.endedAt
				}
				this.$store.dispatch('showSuccessNotification', payload)
			})
		},
		async checkNotificationPermission() {
			// Make sure the service worker registered
			await this.$store.dispatch('initServiceWorker')

			const permission = firebaseMessagingService.getNotificationPermissionStatus()
			if (permission === 'granted') {
				this.askForNotificationPermission()
			} else if (permission === 'default') {
				this.isNotificationDialogOpen = true
			}
			this.isInitializingNotifications = false
		},
		async askForNotificationPermission(): Promise<void> {
			try {
				await this.$store.dispatch('getNotificationPermission')

				this.$store.dispatch('subscribeToTrainingNotification', { trainingId: this.trainingId })
			} finally {
				this.notificationPermission = firebaseMessagingService.getNotificationPermissionStatus()
			}
		},
		initTimer() {
			this.timer.displayedTime = this.calcTimerDisplayedTime(this.training.startedAt)
			this.timer.intervalToken = setInterval(
				() => (this.timer.displayedTime = this.calcTimerDisplayedTime(this.training.startedAt)),
				1000,
			)
		},
		calcTimerDisplayedTime(startedAt: string) {
			const diff = dayjs().diff(startedAt)

			// Hours
			const totalHours = dayjs.duration(diff).asHours()
			const hours = Math.floor(totalHours) // Rounded

			// Minutes
			const totalRemainingMinutes = dayjs.duration({ hours: totalHours % 1 }).asMinutes()
			const minutes = Math.floor(totalRemainingMinutes) // Rounded

			// Seconds
			const seconds = Math.floor(dayjs.duration({ minutes: totalRemainingMinutes % 1 }).asSeconds())

			return { hours, minutes, seconds }
		},
		async submitEmail() {
			this.isSubmittingEmail = true
			try {
				await apiService.subscribeToTrainingEmail(this.email, this.trainingId)
				this.$gtag.event('submit', {
					event_category: 'form',
					event_label: 'email',
				})
			} finally {
				this.isSubmittingEmail = false
				this.email = ''
			}
		},
		async fetchTraining(): Promise<void> {
			const training = await apiService.getTrainingInfo(this.trainingId)
			this.training.startedAt = training.startedAt
			this.training.endedAt = training.endedAt
		},
	},
})
</script>
<style lang="scss" scoped>
.circle-container {
	box-shadow: 10px 10px 30px 0px rgba(174, 174, 192, 0.5), -10px -10px 30px 0px rgba(255, 255, 255, 1);
}
.circle {
	box-shadow: 10px 10px 30px 0px rgba(174, 174, 192, 0.5), -10px -10px 30px 0px rgba(255, 255, 255, 1);
	height: 80%;
	width: 80%;
}

.circle-counter {
	width: 89.5%;
	height: 89.5%;
}

.circle-side-section {
	&.left-section {
		margin-right: -2.25rem;
		border-radius: 190px 0 0 190px;
	}
	&.right-section {
		margin-left: -2.25rem;
		border-radius: 0 190px 190px 0;
	}
	box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.04), 0px 8px 6px 0px rgba(0, 0, 0, 0.04),
		0px 0px 24px 0px rgba(0, 0, 0, 0.06);
}

.circle-loader-success {
	circle {
		stroke-dasharray: 300;
		stroke: rgba(72, 207, 173, 1);
	}
}

.fade-right-enter-active,
.fade-right-leave-active {
	transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-right-enter {
	opacity: 0;
	transform: translateX(-10rem);
}
.fade-right-leave-to {
	opacity: 0;
	transform: translateX(-10rem);
}

.fade-left-enter-active,
.fade-left-leave-active {
	transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-left-enter {
	opacity: 0;
	transform: translateX(10rem);
}
.fade-left-leave-to {
	opacity: 0;
	transform: translateX(10rem);
}
</style>
