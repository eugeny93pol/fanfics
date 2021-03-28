import React from 'react'
import { VKButton } from './VKButton'
import { FBButton } from './FBButton'
import { YAButton } from './YAButton'
import './index.css'

export const SocialButtons = () => {

    return (
        <div className="mt-3 d-flex justify-content-center">
            <VKButton/>
            <FBButton/>
            <YAButton/>
        </div>
    )
}