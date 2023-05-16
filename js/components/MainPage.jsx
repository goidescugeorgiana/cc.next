// js/components/MainPage.jsx
import {useEffect, useState} from "react";

export default function MainPage() {
	const [records, setRecords] = useState([]);

	useEffect(() => {
		try{
			fetch('/api/records', {
				method: 'GET',
			})
				.then(response => response.json())
				.then(json => setRecords(json.data));
		}
		catch (error) {
			console.log(error);
		}
	}, []);

	const deleteRecord = (event) => {
		event.preventDefault();
		const id = event.target.id;
		try {
			fetch(`/api/records?id=${id}`, {
				method: 'DELETE',
			})
				.then(response => response.json())
				.then(json => {
						setRecords(records.filter(record => record._id !== id));
				});
		}
		catch (error) {
			console.log(error);
		}
	}

	return (
		<section className="bg-white dark:bg-blue-900">
			<div className="container px-6 py-10 mx-auto">
				<h1 className="w-[500px] mx-auto text-center text-5xl">Muzeele din București</h1>
				<p className="w-[1000px] mx-auto text-center mt-4 text-2xl">Ghidul tău turistic ce îți prezintă informații despre cele mai fascinante muzee din capitala României. Acum e mult mai simplu să vizitezi fiind informat!</p>

				<div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
					{records.map(record => (
						<div
							key={record._id}
							className="block max-w-sm p-6 bg-blue border border-white-200 rounded-lg shadow hover:bg-blue-100 dark:bg-blue-800 dark:border-blue-700 dark:hover:bg-blue-700">
							<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-blue">
								{record.title}
							</h5>
							<p className="font-normal text-black-700 dark:text-black-400">
								{record.description}
							</p>
							<div className={"flex justify-center mt-4"}>
								<button type="button"
								        id={record._id}
								        onClick={deleteRecord}
								        className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">Delete
								</button>
							</div>
						</div>
					))}
				</div>
				
				
				<div class="flex justify-center mt-4">
    <a href="https://cc-next-git-main-goidescugeorgiana.vercel.app/insert"
            class="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">
        Adaugă alt muzeu
    </a>
</div>			
				</div>
		</section>
	)

}