// Helper function to handle errors and send a response
export const handleError = (res, error, customMessage = 'Internal Server Error') => {
    console.error(error);
    res.status(500).json({ error: customMessage });
};