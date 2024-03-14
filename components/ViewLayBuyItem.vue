<template>
  <div class="flex flex-col gap-2 w-full">
    <div class="text-xl font-bold">View Lay Buy</div>
    <div class="flex w-full flex-col gap-1">
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Item name</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          value="Khakhi Chino pants"
          class="input input-bordered w-full"
        />
      </label>
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Store</span>
        </div>
        <input
          type="text"
          value="Edgars Stores"
          placeholder="Type here"
          class="input input-bordered w-full"
        />
      </label>
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Months (Duration)</span>
        </div>
        <input
          type="text"
          value="6"
          placeholder="Type here"
          class="input input-bordered w-full"
        />
      </label>
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Receipt </span>
        </div>
        <input
          type="file"
          class="file-input file-input-bordered w-full file-input-teal"
        />
      </label>
      <div class="flex gap-2">
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Prize</span>
          </div>
          <input
            type="number"
            placeholder="Type here"
            value="400"
            class="input input-bordered w-full"
          />
        </label>
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Deposit</span>
          </div>
          <input
            type="number"
            placeholder="In Emalangeni"
            value="100"
            class="input input-bordered w-full"
          />
        </label>
      </div>
      <div class="flex gap-2">
        <button
          class="w-full p-2 bg-red-600 text-white font-semibold rounded-md"
        >
          Delete
        </button>
        <button
          class="w-full p-2 bg-teal-600 text-white font-semibold rounded-md"
        >
          Edit
        </button>
      </div>
    </div>
  </div>
</template>
