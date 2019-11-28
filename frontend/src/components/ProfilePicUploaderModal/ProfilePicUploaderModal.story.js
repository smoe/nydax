import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, number } from '@storybook/addon-knobs';
import ProfilePicUploaderModal, {
  WithoutRedux,
} from './ProfilePicUploaderModal';

storiesOf('ProfilePicUploaderModal', module)
  .add('without redux', () => (
    <WithoutRedux
      isUploadingProfilePic={select('isUploading', [true, false], false)}
      profilePicUploadProgress={number('progress', 0)}
      uploadFile={file => file}
    />
  ))
  .add('with redux', () => <ProfilePicUploaderModal />);
