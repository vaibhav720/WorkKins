module.exports = theCatcherFunction => (req, res, next) => {
    Promise.resolve(theCatcherFunction(req, res, next)).catch(next);
}