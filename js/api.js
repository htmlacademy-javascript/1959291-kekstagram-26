const DATA_SOURCE = 'https://26.javascript.pages.academy/kekstagram/data';
const DATA_RECIPIENT = 'https://26.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onFail) => {
  fetch(DATA_SOURCE)
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((data) => {
            onSuccess(data);
          });
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(DATA_RECIPIENT,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      }
      else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
