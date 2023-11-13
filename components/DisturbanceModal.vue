<template>
	<TransitionRoot :show="open">
		<!-- Dialog -->
		<Dialog as="div" class="relative z-20" @close="closeModal">
			<!-- Dialog overlay -->
			<TransitionChild
				enter="duration-200"
				leave="duration-200"
				enter-from="opacity-0"
				leave-to="opacity-0"
			>
				<div class="fixed inset-0 bg-black/30 backdrop-blur" />
			</TransitionChild>

			<!-- Full-screen scrollable container -->
			<div class="fixed inset-0 overflow-y-auto">
				<!-- Container to center the panel -->
				<div class="flex items-center justify-center min-h-full p-4">
					<!-- The actual dialog panel -->
					<TransitionChild
						enter="duration-300 ease-out"
						enter-from="opacity-0 scale-95"
						enter-to="opacity-100 scale-100"
						leave="duration-200 ease-in"
						leave-from="opacity-100 scale-100"
						leave-to="opacity-0 scale-95"
					>
						<DialogPanel class="w-full min-w-[360px] p-5 bg-white shadow-lg rounded-2xl">
							<div class="flex items-center justify-between">
								<!-- Conditional rendering for text -->
								<DialogTitle class="text-xl font-medium text-gray-700"
									>{{ disturbance._id ? "Update" : "Create" }} Disturbance</DialogTitle
								>
							</div>
							<p class="mt-1 text-sm text-gray-500">
								{{ disturbance._id ? "Update this disturbance" : "Create a new disturbance here" }}
							</p>

							<form @submit="submitDisturbance" class="mt-5">
								<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
									<div class="col-span-full">
										<FormInput
											v-model="disturbance.name"
											rules="required"
											label="Name"
											type="text"
											name="name"
											id="disturbance"
										/>
									</div>
								</div>
								<!-- Form buttons -->
								<div class="flex items-center justify-end space-x-3 mt-7">
									<button
										@click="closeModal()"
										type="button"
										class="px-4 text-sm bg-gray-100 py-2.5 rounded-md"
									>
										Cancel
									</button>
									<button type="submit" class="btn">{{ disturbance._id ? "Update" : "Create" }}</button>
								</div>
							</form>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<script setup>
	import {
		Dialog,
		DialogPanel,
		DialogTitle,
		TransitionRoot,
		TransitionChild,
	} from "@headlessui/vue";
	import { useForm } from "vee-validate";

	// instantiate disturbance store
	const disturbanceStore = useDisturbanceStore();
	//Initial form value
	const disturbance = ref({});

	// Get function used to handle form submission and set init form values
	const { handleSubmit } = useForm({
		initialValues: disturbance,
	});

	// Function used to update or create the record
	const submitDisturbance = handleSubmit(async (values, ctx) => {
		if (!disturbance.value._id) {
			// create disturbance
			await disturbanceStore.create(values.name);
			closeModal();
		} else {
			// Updated disturbance
			disturbanceStore.update(disturbance.value._id, values.name);
			closeModal();
		}
	});

	// Control open/close state of modal
	const open = ref(false);
	const openModal = (item) => {
		// Set init values if an object is passed
		if (item) disturbance.value = JSON.parse(JSON.stringify(item));
		open.value = true;
	};
	const closeModal = () => {
		disturbance.value = {};
		open.value = false;
	};

	// Expose these methods to parent components
	defineExpose({
		openModal,
		closeModal,
	});
</script>

<style></style>
