import { defineStore } from "pinia";
import type { IDisturbance } from "~~/types";
import useToast from "./useToast";

export const useDisturbanceStore = defineStore("disturbance-store", {
	state: () => ({
		disturbances: [] as IDisturbance[],
	}),
	actions: {
		// Get all disturbance from DB
		async getAll() {
			try {
				let data = await $fetch<IDisturbance[]>("/api/disturbance");
				this.disturbance = data;
				return data as IDisturbance[];
			} catch (e) {
				useToast().error(e.message);
			}
		},
		// Create a new disturbance
		async create(name: string) {
			await $fetch("/api/disturbance/create", {
				method: "POST",
				body: { name },
			})
				.catch((e) => {
					useToast().error(e.data.message);
				})
				.then(async () => {
					await this.getAll();
					useToast().success("Disturbance created");
				});
		},
		// Update an disturbance
		async update(id: string, name: string) {
			await $fetch(`/api/disturbance/${id}`, {
				method: "PUT",
				body: { name },
			})
				.catch((e) => {
					useToast().error(e.data.message);
				})
				.then(async () => {
					await this.getAll();
					useToast().success("Disturbance updated");
				});
		},
		// delete an disturbance
		async remove(id: string) {
			await $fetch(`/api/disturbance/${id}`, {
				method: "DELETE",
			})
				.catch((e) => {
					useToast().error(e.data.message);
				})
				.then(async () => {
					await this.getAll();
					useToast().success("Disturbance removed");
				});
		},
	},
});
