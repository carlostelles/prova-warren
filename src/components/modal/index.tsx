import * as React from 'react';
import cn from 'clsx';
import ReactModal, {Props as ReactModalProps} from 'react-modal';

import {ReactComponent as TimesIcon} from "../../img/times.svg";

import styles from './style.module.scss';

export interface Props
    extends Pick<ReactModalProps, Exclude<keyof ReactModalProps, 'isOpen'>> {
    show: boolean;
    title: React.ReactNode;
    onClose?: () => void;
}

if (document && document.getElementById('root')) {
    ReactModal.setAppElement('#root');
}

const Modal: React.FunctionComponent<Props> = ({
                                                   show,
                                                   title,
                                                   onClose,
                                                   children,
                                                   className,
                                                   ...props
                                               }) => {
    const [contentRef, setContentRef] = React.useState<HTMLDivElement>();

    React.useEffect(() => {
        if (!contentRef) return;

        setTimeout(() => {
            contentRef.focus();
        }, 2500);
    }, [contentRef]);

    return (
        <ReactModal
            isOpen={show}
            className={styles['modal']}
            contentRef={setContentRef}
            onRequestClose={onClose}
            closeTimeoutMS={.25 * 1000}
            overlayClassName={{
                base: cn(styles['modal'], className, styles['-large']),
                afterOpen: styles['-show'],
                beforeClose: styles['-hide'],
            }}
            bodyOpenClassName={styles['modal-show']}
            {...props}
        >
            <div className={styles['header']}>
                <h2 className={styles['title']}>
                    {title}
                </h2>
                <button
                    type="button"
                    onClick={onClose}
                    className={styles['close']}
                    aria-label="Fechar"
                    data-close=""
                >
                    <TimesIcon
                        aria-hidden="true"
                        data-icon=""
                        className={styles['icon']}
                    />
                </button>
            </div>

            <div className={styles['body']}>{children}</div>
        </ReactModal>
    );
};

export default Modal;
