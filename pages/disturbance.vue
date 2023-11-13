<template>
    <div>
      <Navbar/>
	  <div class="w-full h-full">
		<div class="w-[160px] h-[50px] left-[37px] top-[185px] absolute bg-emerald-500 rounded-[32px] shadow justify-center items-center gap-2.5 inline-flex">
			<NuxtLink to="/maps" class="text-white text-sm font-medium font-['Poppins']">Add New Disturbance</NuxtLink>
		</div>
		<div class="w-6 h-6 left-[1324px] top-[325px] absolute" />
		<div class="w-6 h-6 left-[1289px] top-[325px] absolute">
			<div class="w-[17px] h-[17px] left-[4px] top-[3px] absolute">
			</div>
		</div>
		<div class="w-[1379px] h-[0px] left-[1412px] top-[311px] absolute origin-top-left rotate-180 border border-zinc-200"></div>
		<div class="w-[1285px] h-[30px] left-[63px] top-[286px] absolute">
			<div class="w-[135px] h-[30px] left-0 top-0 absolute text-gray-400 text-[13px] font-medium font-['Lato'] tracking-wide">Disturbance id</div>
			<div class="left-[275px] top-0 absolute text-gray-400 text-[13px] font-medium font-['Lato'] tracking-wide">Cyclone Name</div>
			<div class="w-[110px] h-[21px] left-[540px] top-0 absolute text-gray-400 text-[13px] font-medium font-['Lato'] tracking-wide">Storm Identifier</div>
			<div class="w-[53px] h-[21px] left-[1005px] top-0 absolute text-gray-400 text-[13px] font-medium font-['Lato'] tracking-wide">Priority</div>
			<div class="w-[53px] h-[21px] left-[1232px] top-0 absolute text-gray-400 text-[13px] font-medium font-['Lato'] tracking-wide">Actions</div>
		</div>
		<div class="w-[1379px] h-[31px] left-[33px] top-[328px] absolute">
			<div class="w-[1379px] h-[0px] left-[1379px] top-[31px] absolute origin-top-left rotate-180 border border-zinc-200"></div>
			<div class="left-[30px] top-0 absolute text-zinc-700 text-[13px] font-medium font-['Lato'] tracking-wide">0899_08</div>
			<div class="w-[54px] h-[14.55px] left-[305px] top-0 absolute text-zinc-700 text-[13px] font-medium font-['Lato'] tracking-wide">TC_ILSA</div>
			<div class="left-[570px] top-0 absolute text-zinc-700 text-[13px] font-medium font-['Lato'] tracking-wide">23 U</div>
			<div class="left-[1036px] top-0 absolute text-zinc-700 text-[13px] font-medium font-['Lato'] tracking-wide">1</div>
		</div>
		<div class="w-[1379px] h-[132px] left-[33px] top-[376px] absolute">
			<div class="w-[1379px] h-[0px] left-[1379px] top-[31px] absolute origin-top-left rotate-180 border border-zinc-200"></div>
			<div class="left-[30px] top-0 absolute text-zinc-700 text-[13px] font-medium font-['Lato'] tracking-wide">0899_08</div>
			<div class="w-[54px] h-[14.55px] left-[305px] top-0 absolute text-zinc-700 text-[13px] font-medium font-['Lato'] tracking-wide">TC_ILSA</div>
			<div class="left-[570px] top-0 absolute text-zinc-700 text-[13px] font-medium font-['Lato'] tracking-wide">23 U</div>
			<div class="left-[1036px] top-0 absolute text-zinc-700 text-[13px] font-medium font-['Lato'] tracking-wide">1</div>
			<div class="w-[1379px] h-[82px] left-0 top-[50px] absolute">
			<div class="w-[1379px] h-[0px] left-[1379px] top-[31px] absolute origin-top-left rotate-180 border border-zinc-200"></div>
			<div class="left-[30px] top-0 absolute text-zinc-700 text-[13px] font-medium font-['Lato'] tracking-wide">0899_08</div>
			<div class="w-[54px] h-[14.55px] left-[305px] top-0 absolute text-zinc-700 text-[13px] font-medium font-['Lato'] tracking-wide">TC_ILSA</div>
			<div class="left-[570px] top-0 absolute text-zinc-700 text-[13px] font-medium font-['Lato'] tracking-wide">23 U</div>
			<div class="left-[1036px] top-0 absolute text-zinc-700 text-[13px] font-medium font-['Lato'] tracking-wide">1</div>
			<div class="w-[1379px] h-[31px] left-0 top-[51px] absolute">
				<div class="w-[1379px] h-[0px] left-[1379px] top-[31px] absolute origin-top-left rotate-180 border border-zinc-200"></div>
				<div class="left-[30px] top-0 absolute text-zinc-700 text-[13px] font-medium font-['Lato'] tracking-wide">0899_08</div>
				<div class="w-[54px] h-[14.55px] left-[305px] top-0 absolute text-zinc-700 text-[13px] font-medium font-['Lato'] tracking-wide">TC_ILSA</div>
				<div class="left-[570px] top-0 absolute text-zinc-700 text-[13px] font-medium font-['Lato'] tracking-wide">23 U</div>
				<div class="left-[1036px] top-0 absolute text-zinc-700 text-[13px] font-medium font-['Lato'] tracking-wide">1</div>
			</div>
			</div>
		</div>
		</div>
	</div>
</template>

<script>
import Navbar from "~/components/Navbar/NavbarDisturbance.vue";

export default {
  name: 'App',
  components: {
    Navbar,
  }
}
</script>