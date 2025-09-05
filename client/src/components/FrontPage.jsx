import React from 'react'

const FrontPage = () => {
	return (
		<div className="grid grid-cols-12 gap-4 w-full h-fit px-5 md:px-10 lg:px-20 my-8">
			<div className="col-span-9 flex flex-col items-center justify-center space-x-3 min-h-72">
				<div className="felx flex-col space-y-4">
					<div className="grid grid-cols-12 gap-4">
						<div className="col-span-9 flex flex-col space-y-4">
							<p className="text-3xl font-bold text-black hover:text-amber-500">'Impeachment, assassination attempts...' Gachagua likens himself to Donald Trump.</p>
							<img src="https://assets.citizen.digital/158317/conversions/Untitled-design-%2850%29-mainStory.webp" alt="" className="h-80 min-h-[350px] max-h-[400px] object-cover" />
						</div>
						<div className="col-span-3 flex flex-col p-4 h-full rounded-md">
							<p className="text-black font-bold p-3">TRENDING NOW</p>
							<div className="flex flex-col space-y-6">
								<span className="flex flex-col space-y-2 cursor-pointer">
									<p className="text-sm font-semibold text-black hover:text-gray-400 transition-all delay-200">Court issues orders in rape allegations case against...</p>
									<p className="text-sm font-normal text-black">3 hrs ago</p>
								</span>
								<span className="flex flex-col space-y-2 cursor-pointer">
									<p className="text-sm font-semibold text-black hover:text-gray-400 transition-all delay-200">Faith Odhiambo: Why I accepted Ruto’s appointment...</p>
									<p className="text-sm font-normal text-black">3 hrs ago</p>
								</span>
								<span className="flex flex-col space-y-2 cursor-pointer">
									<p className="text-sm font-semibold text-black hover:text-gray-400 transition-all delay-200">How I lost over Ksh.150 million in Nairobi fake gold...</p>
									<p className="text-sm font-normal text-black">3 hrs ago</p>
								</span>
								<span className="flex flex-col space-y-2 cursor-pointer">
									<p className="text-sm font-semibold text-black hover:text-gray-400 transition-all delay-200">Dialogue, avoid impeachment drama - Nairobi leaders urge...</p>
									<p className="text-sm font-normal text-black">3 hrs ago</p>
								</span>
							</div>
						</div>
					</div>
					<div className="flex flex-row items-center w-full h-64 rounded-md justify-between">
						<span className="flex flex-col space-y-2 w-72 h-full cursor-pointer">
							<img src="https://assets.citizen.digital/wp-content/uploads/2021/10/4003/conversions/knife-pinned.jpg" alt="" className="h-36 w-full object-cover" />
							<p className="text-sm font-semibold text-black hover:text-gray-400 transition-all delay-200">Court issues orders in rape allegations case against...</p>
						</span>
						<span className="flex flex-col space-y-2 w-72 h-full cursor-pointer">
						<img src="https://assets.citizen.digital/158313/conversions/WhatsApp-Image-2025-09-05-at-11.45.57-pinned.webp" alt="" className="h-36 w-full object-cover" />
							<p className="text-sm font-semibold text-black hover:text-gray-400 transition-all delay-200">Faith Odhiambo: Why I accepted Ruto’s appointment...</p>
						</span>
						<span className="flex flex-col space-y-2 w-72 h-full cursor-pointer">
						<img src="https://assets.citizen.digital/158315/conversions/obado-pinned.webp" alt="" className="h-36 w-full object-cover" />
							<p className="text-sm font-semibold text-black hover:text-gray-400 transition-all delay-200">How I lost over Ksh.150 million in Nairobi fake gold...</p>
						</span>
					</div>
				</div>
			</div>
			<div className="col-span-3 flex flex-col items-center justify-center space-y-3 min-h-72 ">
				<div className="flex flex-col items-center justify-center h-full border border-gray-300 w-full">Adds</div>
				<div className="flex flex-col items-center justify-center space-y-4">
					<p className="text-black font-bold p-3">ORIGINAL</p>
					<div className="flex flex-col space-y-6">
						<span className="flex flex-col space-y-2 cursor-pointer">
							<p className="text-sm font-semibold text-black hover:text-gray-400 transition-all delay-200">Court issues orders in rape allegations case against...</p>
							<p className="text-sm font-normal text-black">3 hrs ago</p>
						</span>
						<span className="flex flex-col space-y-2 cursor-pointer">
							<p className="text-sm font-semibold text-black hover:text-gray-400 transition-all delay-200">Faith Odhiambo: Why I accepted Ruto’s appointment...</p>
							<p className="text-sm font-normal text-black">3 hrs ago</p>
						</span>
						<span className="flex flex-col space-y-2 cursor-pointer">
							<p className="text-sm font-semibold text-black hover:text-gray-400 transition-all delay-200">How I lost over Ksh.150 million in Nairobi fake gold...</p>
							<p className="text-sm font-normal text-black">3 hrs ago</p>
						</span>
						<span className="flex flex-col space-y-2 cursor-pointer">
							<p className="text-sm font-semibold text-black hover:text-gray-400 transition-all delay-200">Dialogue, avoid impeachment drama - Nairobi leaders urge...</p>
							<p className="text-sm font-normal text-black">3 hrs ago</p>
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FrontPage
// https://assets.citizen.digital/wp-content/uploads/2021/10/4003/conversions/knife-pinned.jpg