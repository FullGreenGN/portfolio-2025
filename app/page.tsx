import { GLSLHills } from "@/features/landing/hero";
import { FocusCards } from "@/components/ui/focus-card";


export default function Home() {
 	return (
 		<main id="home">
             <GLSLHills />

 			{/* project sections */}
 			<section id="projects">
 				<div className={"container mx-auto flex min-h-screen w-full flex-col items-start justify-start px-6 py-32"}>
 					<h2 className={"mb-10 text-4xl font-semibold text-white"}>Projects</h2>
					<FocusCardsDemo />
 				</div>
 			</section>
 		</main>
 	);
}


export function FocusCardsDemo() {
	const cards = [
		{
			title: "Forest Adventure",
			src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		{
			title: "Valley of life",
			src: "https://images.unsplash.com/photo-1600271772470-bd22a42787b3?q=80&w=3072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		{
			title: "Sala behta hi jayega",
			src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=3070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		{
			title: "Camping is for pros",
			src: "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		{
			title: "The road not taken",
			src: "https://images.unsplash.com/photo-1507041957456-9c397ce39c97?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		{
			title: "The First Rule",
			src: "https://assets.aceternity.com/the-first-rule.png",
		},
	];

	return <FocusCards cards={cards} />;
}

