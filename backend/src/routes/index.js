export default function setRoutes(app) {
    const IndexController = require('../controllers/index').default;
    const indexController = new IndexController();

    app.get('/', indexController.home);
    app.get('/api/data', indexController.getData);
    // Add more routes as needed
}