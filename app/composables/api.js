import ky from 'ky'
export default ky.extend({
   prefixUrl: 'http://localhost:5000',
	headers: {
		'Content-Type': 'application/json',	
	},
	hooks: {
		// beforeRequest: [ () => console.log('before 1') ],
		// afterResponse: [ () => console.log('after 1') ],
	},
});