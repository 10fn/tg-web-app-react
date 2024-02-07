const tg = window.Telegram.WebApp
export const useTelegram = () => {

    const showMainButton = () => {
        tg.MainButton.show()
    }

    const hideMainButton = () => {
        tg.MainButton.hide()
    }

    return {
        tg,
        user: tg.initDataUnsafe.user,
        queryId: tg.initDataUnsafe?.query_id,
        showMainButton,
        hideMainButton,
    }
}