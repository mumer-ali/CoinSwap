import { useState, useEffect } from "react";

export default function Form() {
	const [output, setOutput] = useState("");
	const [input, setInput] = useState("0");
	const [from, setFrom] = useState("PKR");
	const [to, setTo] = useState("USD");
	const [keys, setKeys] = useState([]);
	useEffect(() => {
		const fetchKeys = async () => {
		  try {
			const response = await fetch("https://v6.exchangerate-api.com/v6/b50e62b8b8bfbc73fada46a0/latest/PKR");
			const data = await response.json();
			const conversionRatesKeys = Object.keys(data["conversion_rates"]);
        	setKeys(conversionRatesKeys);
		  } catch (error) {
			alert("Error");
		  }
		};
		fetchKeys();
	  }, []);
	  useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`https://v6.exchangerate-api.com/v6/b50e62b8b8bfbc73fada46a0/latest/${from}`);
			const data = await response.json();
			let exRate = data["conversion_rates"][to] * Number(input);
			setOutput(exRate);
		};
		fetchData();
	  }, [from, to, input]);
  	return (
		<>
			<div className="h-screen w-screen flex justify-center items-center">
				<div className="bg-[rgba(133,122,122,0.5)] flex flex-col h-48 w-64 justify-center items-center rounded-lg border-2">
					<div className="flex justify-center items-center">
						<input type="text" id="from" name="from" placeholder="From:" className="outline-none w-38 h-10 p-2 text-sm bg-white" value={input} onChange={(e) => setInput(e.target.value)}/>
						<select className="outline-none h-10 w-14 text-xs" value={from} onChange={(e) => setFrom(e.target.value)}>
							{keys.map((option, index) => (
								<option key={index} value={option} className="text-xs">
								{option}
								</option>
							))}
						</select>
					</div>
					<br />
					<div className="flex justify-center items-center">
						<input type="text" id="to" name="to" placeholder="To:" className="outline-none w-38 h-10 p-2 text-sm bg-white" disabled value={output}/>
						<select className="outline-none h-10 w-14 text-xs" value={to} onChange={(e) => setTo(e.target.value)}>
							{keys.map((option, index) => (
								<option key={index} value={option} className="text-xs">
								{option}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>
		</>
  	);
}