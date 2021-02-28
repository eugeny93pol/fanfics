import React from 'react'
import {VKButton} from './buttons/VKButton'
import {FBButton} from './buttons/FBButton'
import {TWButton} from './buttons/TWButton'

export const SocialButtons = () => {

    return (
        <div className="mt-3 d-flex justify-content-center">
            <VKButton/>
            <FBButton/>
            <TWButton/>
        </div>
    )
}