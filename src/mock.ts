import {
    IChatPage,
    IProfilePageProps,
    IProfileSettingsPageProps
} from "./code/types";

export const ProfilePageMock: IProfilePageProps = {
    avatarAlt: 'Иван',
    avatarUrl: './assets/images/empty.png',
    buttonBack: {
        text: 'Назад',
    },
    infoBlock: {
        items: [
            {
                value: 'pochta@yandex.ru',
                name: 'Почта',
            },
            {
                value: 'ivanivanov',
                name: 'Логин',
            },
            {
                value: 'Иван',
                name: 'Имя',
            },
            {
                value: 'Иванов',
                name: 'Фамилия',
            },
            {
                value: 'Иван',
                name: 'Имя в чате',
            },
            {
                value: '+7 (909) 967 30 30',
                name: 'Телефон',
            },
        ],
    },
    settingBlock: {
        items: [
            {
                link: 'Изменить данные',
            },
            {
                link: 'Изменить пароль',
            },
            {
                isExit: true,
            },
        ],
    },
    profileName: 'Иван',
};

export const ProfileSettingsMock: IProfileSettingsPageProps = {
    avatarAlt: 'Иван',
    avatarUrl: './assets/images/empty.png',
    profileName: 'Иван',
    buttonBack: {
        text: 'Назад',
    },
    form: {
        formTitle: 'Редактировать информацию',
        formId: 'profileSettings',
        fields: [
            {
                label: 'E-mail',
                placeholder: 'Введите e-mail',
                name: 'email',
                type: 'email'
            },
            {
                label: 'Логин',
                placeholder: 'Введите логин',
                name: 'login',
                type: 'text'
            },
            {
                label: 'Имя',
                placeholder: 'Введите имя',
                name: 'first_name',
                type: 'text'
            },
            {
                label: 'Фамилия',
                placeholder: 'Введите фамилию',
                name: 'second_name',
                type: 'text'
            },
            {
                label: 'Телефон',
                placeholder: 'Введите номер телефона',
                name: 'phone',
                type: 'tel'
            },
            {
                label: 'Аватар',
                placeholder: 'Выбрать файл',
                name: 'file',
                type: 'file'
            },
        ],
        buttons: [
            {
                type: "button",
                text: "Изменить",
            },
            {
                type: "button",
                isSecondary: true,
                text: "Отмена",
            },
        ],
    }

};

export const ProfileChangePasswordMock: IProfileSettingsPageProps = {
    buttonBack: {
        text: 'Назад',
    },
    form: {
        formTitle: 'Изменить пароль',
        formId: 'changePassword',
        fields: [
            {
                label: 'Старый пароль',
                placeholder: 'Введите пароль',
                name: 'password',
                type: 'password'
            },
            {
                label: 'Новый пароль',
                placeholder: 'Введите пароль',
                name: 'password',
                type: 'password'
            },
            {
                label: 'Новый пароль (еще раз)',
                placeholder: 'Введите пароль',
                name: 'password2',
                type: 'password'
            }
        ],
        buttons: [
            {
                type: "button",
                text: "Изменить",
            },
            {
                type: "button",
                isSecondary: true,
                text: "Отмена",
            },
        ],
    }

};


export const ChatPageMock : IChatPage = {
    chatBottom: {
        buttonAttach: {
            type: 'button',
            iconClass: 'button-attach',
        },
        buttonSend: {
            type: 'submit',
            iconClass: 'button-send',
        },
        messageField: {},
    },
    chatHeader: {
        chatName: 'Кира',
    },
    chatSearch: {
        placeholder: 'Поиск',
        type: 'text',
        name: 'search',
    },
    chatsList: [
        {
            chatName: 'Кира',
            message: 'Привет!',
            date: '21.12.2123',
            count : 5,
        },
        {
            chatName: 'Кира',
            message: 'Привет!',
            date: '21.12.2123',
            count : 5,
        },
        {
            chatName: 'Кира',
            message: 'Привет!',
            date: '21.12.2123',
            count : 5,
        },
        {
            chatName: 'Кира',
            message: 'Привет!',
            date: '21.12.2123',
            count : 5,
        },
        {
            chatName: 'Кира',
            message: 'Привет!',
            date: '21.12.2123',
            count : 5,
        },
        {
            chatName: 'Кира',
            message: 'Привет!',
            date: '21.12.2123',
            count : 5,
        },
        {
            chatName: 'Кира',
            message: 'Привет!',
            date: '21.12.2123',
            count : 5,
        },
    ],
    messages: [
        {
            isImage: false,
            isIncoming: true,
            messageContent: 'Привет!',
            author: 'Кира',
            messageDate: '21.12.2123',
        },
        {
            isImage: false,
            isIncoming: false,
            messageContent: 'Привет!',
            author: 'Кира',
            messageDate: '21.12.2123',
        }
    ],
    error: {
        errorText: 'У вас еще нет чата с этим участником',
    }
};
