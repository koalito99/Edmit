import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Avatar, { EAvatarSize, EAvatarTheme, EAvatarType } from '.';
import NortheasternLogo from '../../../../src/assets/demo/Northeastern.png';

storiesOf('atoms/Avatars', module)
    .add('User', () => (
        <div>
            <Avatar
                type={EAvatarType.User}
                theme={EAvatarTheme.White}
                size={EAvatarSize.XSmall}
                initials={'RH'}
            />
            <Avatar
                type={EAvatarType.User}
                theme={EAvatarTheme.White}
                size={EAvatarSize.Small}
                initials={'RH'}
            />
            <Avatar
                type={EAvatarType.User}
                theme={EAvatarTheme.White}
                size={EAvatarSize.Medium}
                initials={'RH'}
            />
            <Avatar
                type={EAvatarType.User}
                theme={EAvatarTheme.Offwhite}
                size={EAvatarSize.Medium}
                initials={'RH'}
            />
            <Avatar
                type={EAvatarType.User}
                theme={EAvatarTheme.White}
                size={EAvatarSize.Large}
                initials={'RH'}
            />
        </div>
    ))
    .add('College', () => (
        <div>
            <Avatar
                type={EAvatarType.College}
                theme={EAvatarTheme.White}
                size={EAvatarSize.XSmall}
                logoSrc={NortheasternLogo}
            />
            <Avatar
                type={EAvatarType.College}
                theme={EAvatarTheme.White}
                size={EAvatarSize.Small}
                logoSrc={NortheasternLogo}
            />
            <Avatar
                type={EAvatarType.College}
                theme={EAvatarTheme.White}
                size={EAvatarSize.Medium}
                logoSrc={NortheasternLogo}
            />
            <Avatar
                type={EAvatarType.College}
                theme={EAvatarTheme.Offwhite}
                size={EAvatarSize.Medium}
                logoSrc={NortheasternLogo}
            />
            <Avatar
                type={EAvatarType.College}
                theme={EAvatarTheme.White}
                size={EAvatarSize.Large}
                logoSrc={NortheasternLogo}
            />
        </div>
    ));