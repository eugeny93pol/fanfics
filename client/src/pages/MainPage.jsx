import React, { Fragment, useCallback, useState } from 'react'
import { Modal } from '../components/modal/Modal'
import { SigninPage } from './SigninPage'

export const MainPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const showHandle = () => {
        setIsModalOpen(true)
    }

    const cancelModalHandler = () => {
        setIsModalOpen(false)
        return false
    }

    const submitModalHandler = () => {
        setIsModalOpen(false)
    }

    return(
        <Fragment>
            <section>
                <h2>Last updates</h2>
            </section>
            <section>
                <h2>Most rated</h2>
            </section>
            <section>
                <h2>Tag cloud</h2>
            </section>

            <button className="btn btn-danger" onClick={ showHandle }>modal</button>

            <Modal title='Modal message'
                   isOpen={ isModalOpen }
                   onCancel={ cancelModalHandler }
                   onSubmit={ submitModalHandler }
            >
                <SigninPage/>
            </Modal>

        </Fragment>
    )
}