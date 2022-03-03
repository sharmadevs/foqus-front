export function BufferToBase64(arr:any[]) {
    let dt= btoa(arr.reduce((data, byte) => data + String.fromCharCode(byte), ''));
    return "data:image/png;base64,"+dt;
}