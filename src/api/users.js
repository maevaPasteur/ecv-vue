import API from '../api/config';

export const isAdmin = new Promise((resolve, reject) => {
    API.head('/admin').then(res => {
        if (res.statusText === 'OK') resolve();
        else reject()
    }).catch(() => reject())
});