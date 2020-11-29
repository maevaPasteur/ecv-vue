import API from '../api/config';

export const isAdmin = () => {
    return new Promise((resolve, reject) => {
        API.head('/admin')
            .then(res => {
                if (res.statusText === 'OK') resolve();
                else reject()
            })
            .catch(() => reject())
    })
};

export const isConnect = () => {
    return new Promise((resolve, reject) => {
        API.head('/user')
            .then(res => {
                if (res.statusText === 'OK') resolve();
                else reject()
            })
            .catch(() => reject())
    })
};




