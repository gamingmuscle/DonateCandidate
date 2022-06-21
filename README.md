DonateCandidate
DonateCandidate is a demo application utilising REACTjs and .NET 6 technologies.  It includes includes internal and external API calls utilising GET/POST/PUT and DELETE

Dependencies
	MySql
	NodeJs
	ASP.net 6.0+
	
Installation
	Extract to desired directory
	Create database application user
	update appsettings.json with user credentials
	
Starting API
	cd WebAPI
	Windows
		START /B WebAPI
	Linux
		sudo WebAPI &
	You may need to add an exception for https://localhost:7085/ 

Starting UI
	From DoncateCandidate root directory
	cd donate-candidate-app
	npm start build
	
 