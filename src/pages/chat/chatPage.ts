import './chat.pcss';
import template from './chat.hbs';
import {Block} from '../../code/base/block/Block';
import {IFormProps, IInputProps, IMessageField} from '../../code/types';
import {ChatSearchComponent} from '../../partials/chat/chatSearch/chatSearchComponent';
import {ChatItemComponent} from '../../partials/chat/chatItem/chatItemComponent';
import {ChatWindowHeaderComponent} from '../../partials/chat/chatWindow/header/chatWindowHeaderComponent';
import {ChatMessageComponent} from '../../partials/chat/chatWindow/chatMessage/chatMessageComponent';
import {Error} from '../../partials/error/errorComponent';
import services from '../../code/services';
import {store} from '../../store';
import {Button} from '../../partials/button/buttonComponent';
import {FormComponent} from '../../partials/form/formComponent';
import {VALIDATE_TYPES} from '../../code/dictionary/dictionary';
import {validate, validateForm} from '../../utils/validation';
import {collectingFormFields} from '../../utils/collectingFormFields';
import {IChatItem, IChatSocketMessage, IChatUserPayload, INewChatBody} from '../../code/services/ChatsServices/types';
import {router} from '../../utils/useRouter';
import {getLocalStorageItem} from '../../utils/localStorage';
import {ChatBottomComponent} from '../../partials/chat/chatWindow/message/chatMessageComponent';
import {DialogServices} from '../../code/services/DialogServices/DialogServices';

export class ChatPage extends Block {
  dialogServices: DialogServices;

  constructor() {
    document.title = 'Чат';
    const {id = null} = router.getParams();
    const defaultValues = {
      chatList: store.getState().chatList,
      currentChatId: id,
    };
    super({...defaultValues});
  }

  public scrollDown() {
    const dialogBody = document.querySelector('.chat__content');
    if (dialogBody && dialogBody.scrollHeight) {
      console.log(scroll);
      dialogBody.scrollTo({
        top: dialogBody.scrollHeight,
      });
    }
  }


  init() {
    console.log('init');
    this.children.chatSearch = new ChatSearchComponent({
      placeholder: 'Поиск',
      type: 'text',
      name: 'search',
      value: '',
    });

    this.children.noOpenChat = new Error({
      errorText: 'Откройте чат',
    });

    services.chatServices.getChats().then(() => {
      store.subscribe((state) => {
        this.setProps({
          chatList: state.chatList,
          chatMessages: state.chatMessages,
        });
      });
    });
  }

  componentDidMount() {
    console.log('mount');
    store.subscribe((state) => {
      this.setProps({
        chatList: state.chatList,
        chatMessages: state.chatMessages,
      });
    });

    this.children.newChatFrom = new FormComponent({
      formTitle: 'Создание чата',
      formId: 'createChat',
      fields: [
        {
          type: 'text',
          name: 'title',
          placeholder: 'Введите название чата',
          label: 'Название чата',
          validateType: VALIDATE_TYPES.message,
          required: true,
        },
      ],
      buttons: [
        {
          type: 'submit',
          text: 'Создать',
          disabled: true,
        },
        {
          text: 'Отмена',
          events: {
            click: () => {
              this.setProps({
                newChatFormOpen: false,
                isChatOpen: true,
              });
            },
          },
        },
      ],
    });
    this.children.formRemoveUser = new FormComponent({
      formTitle: 'Удалить пользователя',
      formId: 'removeChat',
      fields: [
        {
          type: 'text',
          name: 'title',
          placeholder: 'Введите id пользователя',
          label: 'ID пользователя',
        },
      ],
      buttons: [
        {
          type: 'submit',
          text: 'Удалить',
        },
        {
          text: 'Отмена',
          events: {
            click: () => {
              this.setProps({
                removeUserForm: false,
                isChatOpen: true,
              });
            },
          },
        },
      ],
      events: {
        submit: async (event: Event) => {
          event.preventDefault();
          const target = event.target as HTMLFormElement;
          const formdata = collectingFormFields([...target]);
          const data: IChatUserPayload = {
            chatId: this.props.currentChatId,
            users: [Number(formdata.title)],
          };
          const response = await services.chatServices.removeUserForChat(data);

          if (response) {
            this.setProps({
              removeUserForm: false,
              isChatOpen: true,
            });
          }

        },
      },
    });
    this.children.formAddUser = new FormComponent({
      formTitle: 'Добавить пользователя',
      formId: 'addChat',
      fields: [
        {
          type: 'number',
          name: 'title',
          placeholder: 'Введите id пользователя',
          label: 'ID пользователя',
        },
      ],
      buttons: [
        {
          type: 'submit',
          text: 'Добавить',
        },
        {
          text: 'Отмена',
          events: {
            click: () => {
              this.setProps({
                addUserForm: false,
                isChatOpen: true,
              });
            },
          },
        },
      ],
      events: {
        submit: async (event: Event) => {
          event.preventDefault();
          const target = event.target as HTMLFormElement;
          const formdata = collectingFormFields([...target]);
          const data: IChatUserPayload = {
            chatId: this.props.currentChatId,
            users: [Number(formdata.title)],
          };
          const response = await services.chatServices.addUserForChat(data);

          if (response) {
            this.setProps({
              addUserForm: false,
              isChatOpen: true,
            });
          }

        },
      },
    });
    const newChatForm = this.children.newChatFrom as Block<IFormProps>;
    if (newChatForm.children.fields && (newChatForm.children.fields as Block<IInputProps>[]).length) {
      (newChatForm.children.fields as Block<IInputProps>[]).forEach((el) => {
        el.setProps({
          events: {
            change: (event) => {
              if (event) {
                const errors = validate(
                  el.props.validateType as VALIDATE_TYPES,
                  (event.target! as HTMLInputElement).value,
                  el.props.required,
                );

                el.setProps({
                  value: (event.target! as HTMLInputElement).value,
                  errorText: errors,
                });
              }
            },
          },
        });
      });
    }

    this.children.addChatButton = new Button({
      text: 'Создать чат',
      isSecondary: true,
      events: {
        click: () => {
          this.setProps({
            newChatFormOpen: true,
            isChatOpen: false,
          });

          (this.children.newChatFrom as Block<IFormProps>).setProps({
            events: {
              change: () => {
                const isValidForm = validateForm(newChatForm.children.fields as Block<IInputProps>[]);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.children.newChatFrom.children.buttons[0].setProps({
                  disabled: isValidForm,
                });
              },
              submit: async (event: Event) => {
                event.preventDefault();
                const target = event.target as HTMLFormElement;
                const data = collectingFormFields([...target]);
                const response = await services.chatServices.createNewChat(data as INewChatBody);

                if (response) {
                  await services.chatServices.getChats();
                }
              },
            },
          });
        },
      },
    });

    const userId = store.getState().currentUser.id ?? getLocalStorageItem('userId');

    if (!this.props.currentChatId) {
      this.setProps({
        dontHasChatId: true,
      });
    } else if (this.props.currentChatId && this.props.chatList) {
      this.setProps({
        dontHasChatId: false,
        isChatOpen: true,
      });

      services.chatServices.getChatToken({id: this.props.currentChatId}).then((response) => {
        this.dialogServices = services.dialogServices(userId, response as string, this.props.currentChatId);
        this.dialogServices.open({
          content: '0',
          type: 'get old',
        });

        if (this.dialogServices) {
          this.dialogServices.emitter.on('chatMessages', (data) => {
            if (Array.isArray(data)) {
              const messages = data.sort((a, b) => b.id - a.id);
              this.setProps({
                chatMessages: messages,
              });

              store.setState({
                messagesList: messages,
              });
            }
            if (data.type === 'message') {
              store.setState({
                messagesList: [...store.getState().messagesList, data],
              });
              this.scrollDown();
            }
          });
        }
      });
    } else {
      this.children.error = new Error({
        errorCode: 'У вас еще нет чатов',
        errorText: 'создайте чаты и добавте пользователей',
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  componentDidUpdate() {
    console.log('update');

    if (this.props.chatList && this.props.chatList.length > 0) {
      this.children.chatsList = this.props.chatList.map((el: IChatItem) => new ChatItemComponent({
        avatar: `https://ya-praktikum.tech/api/v2/resources`,
        chatName: el.title,
        count: el.unread_count,
        message: el.last_message?.content || '',
        id: el.id,
        events: {
          click: () => {
            router.go(`/messages/${el.id}`, true);
          },
        },
      }));
    }

    if (this.props.currentChatId) {
      const currentChat = this.props.chatList.find((el: IChatItem) => {
        return el.id == this.props.currentChatId;
      });

      if (currentChat) {
        this.children.chatHeader = new ChatWindowHeaderComponent({
          chatName: currentChat?.title,
          avatar: `https://ya-praktikum.tech/api/v2/resources/${currentChat?.avatar}`,
          currentChat: currentChat,
          buttonRemoveUser: {
            iconClass: 'icon-remove',
            events: {
              click: () => {
                this.setProps({
                  removeUserForm: true,
                  isChatOpen: false,
                });
              },
            },
          },
          buttonAddUser: {
            iconClass: 'icon-add',
            events: {
              click: () => {
                this.setProps({
                  addUserForm: true,
                  isChatOpen: false,
                });
              },
            },
          },
          buttonRemoveChat: {
            text: 'Удалить чат',
            isSecondary: true,
            events: {
              click: () => services.chatServices.removeCurrentChat({chatId: this.props.currentChatId}),
            },
          },
        });
      }

      let sendMessageValue: string;
      this.children.chatBottom = new ChatBottomComponent({
        buttonSend: {
          type: 'submit',
          iconClass: 'icon-send',
          events: {
            click: () => {
              this.dialogServices.sendMessage({
                content: sendMessageValue,
                type: 'message',
              });
              ((this.children.chatBottom as Block<ChatBottomComponent>).children.messageField as Block<IMessageField>)?.setProps({
                value: '',
              });
            },
          },
        },
        messageField: {
          events: {
            input: (event) => {
              sendMessageValue = (event?.target as HTMLTextAreaElement).value;
            },
          },
        },
      });
    }

    if (this.props.chatMessages?.length) {
      store.subscribe((state) => {
        this.children.messages = state.messagesList.map((el: IChatSocketMessage) => {
          const userId = Number(getLocalStorageItem('userId'));
          return new ChatMessageComponent({
            messageContent: el?.content || '',
            messageDate: el?.time,
            isIncoming: el?.user_id !== userId,
            author: el?.user_id === getLocalStorageItem('userId') ? 'Я' : String(el?.user_id),
          });
        });
      });
    }

    return true;
  }

  onDestroy() {
    console.log('destroy');
    if (this.dialogServices?.ws) {
      this.dialogServices.close();
    }
  }

  render() {
    return this.compile(template, {...this.props});
  }

}
