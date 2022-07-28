let useCheckOnline = () => {
    if (!window.navigator.onLine) {
        alert("turn internet");
        return;
    }
}
export { useCheckOnline };