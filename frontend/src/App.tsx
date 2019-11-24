import React from 'react';
import './App.css';
import {Title} from "./title/Title";

const App: React.FC = () => {
	return (
		<div className="App">
			<header className="App-header">
				<Title/>
			</header>
		</div>
	);
};

export default App;
