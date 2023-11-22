<template>
	<div class="modal-overlay">
    <div class="flex items-center justify-center h-screen">
      <div class="w-[25rem] h-[20rem] bg-gray-200 rounded-[10px] flex flex-col">
        <div class="w-[25rem] h-[2.5rem] bg-emerald-500 rounded-tl-[10px] rounded-tr-[10px] shadow">
          <div class="ml-4 mt-2 text-white text-base text-semibold font-poppins">Create New Disturbance</div>
        </div>
	
		<div class="p-4 flex flex-col flex-grow">
		  <div class="flex items-center mb-3">
			<div class="text-black text-base font-medium font-poppins tracking-wide">Disturbance Id</div>
			<span class="flex-grow"></span>
			<input class="w-[13rem] h-[2rem] bg-white text-black text-sm rounded-[3px] border border-zinc-400" type="text" placeholder="0899_08">
		  </div>
	
		  <div class="flex items-center mb-3">
			<div class="text-black text-base font-medium font-poppins tracking-wide">Cyclone Name</div>
			<span class="flex-grow"></span>
			<input class="w-[13rem] h-[2rem] bg-white text-black text-sm rounded-[3px] border border-zinc-400" type="text" placeholder="TC_ILSA">
		  </div>
	
		  <div class="flex items-center mb-3">
			<div class="text-black text-base font-medium font-poppins tracking-wide">Storm Identifier</div>
			<span class="flex-grow"></span>
			<input class="w-[13rem] h-[2rem] bg-white text-black text-sm rounded-[3px] border border-zinc-400" type="text" placeholder="23 U">
		  </div>
	
		  <div class="flex items-center mb-3">
			<div class="text-black text-base font-medium font-poppins tracking-wide">Priority</div>
			<span class="flex-grow"></span>
			<input class="w-[13rem] h-[2rem] bg-white text-black text-sm rounded-[3px] border border-zinc-400" type="text" placeholder="1">
		  </div>
	
		  <div class="mt-7">
			<div class="flex justify-end">
			  <NuxtLink to="/maps" class="w-[6rem] h-[2.5rem] flex items-center justify-center bg-emerald-500 text-white font-poppins rounded-[10px]">Create</NuxtLink>
			</div>
		  </div>
		</div>
	  </div>
	</div>
	</div>
  </template>
  
  <script>
  export default {
	methods: {
	  closeModal() {
		this.$emit('closeModal');
	  },
	},
  };
  </script>
  
  <style scoped>
 .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent black overlay */
  z-index: 999; /* Adjust the z-index to make sure it appears above other elements */
}
  </style>
  