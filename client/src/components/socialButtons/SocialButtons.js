import React from 'react'
import { VKButton } from './VKButton'
import { FBButton } from './FBButton'
import { TWButton } from './TWButton'

export const SocialButtons = () => {

    return (
        <div className="mt-3 d-flex justify-content-center">
            <VKButton/>
            <FBButton/>
            <TWButton/>
        </div>
    )
}