const getMessage = (error: any) => {
    if (error.status === 400) {
        return '';
    } else {
        return 'Something went wrong! Try again later!'
    }
}

export default getMessage;