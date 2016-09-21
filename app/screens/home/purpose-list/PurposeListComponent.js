import React, { PropTypes } from 'react';

import { getName } from 'utils/DataUtils';
import { getSearchPageUrl } from 'utils/SearchUtils';
import PurposeListItemComponent from './PurposeListItemComponent';

import manufacturingImage from './images/manufacturing.jpg';
import meetingsAndWorkingImage from './images/meetings-and-working.jpg';
import photoAndAudioImage from './images/photo-and-audio.jpg';
import sportsImage from './images/sports.jpg';

const images = {
  manufacturing: manufacturingImage,
  'meetings-and-working': meetingsAndWorkingImage,
  'photo-and-audio': photoAndAudioImage,
  sports: sportsImage,
};

function renderPurposeListItem(purpose) {
  return (
    <PurposeListItemComponent
      imageUrl={images[purpose.id] || ''}
      key={purpose.id}
      linkUrl={getSearchPageUrl({ purpose: purpose.id })}
      text={getName(purpose)}
    />
  );
}

function PurposeListComponent({ purposes }) {
  return (
    <div className="purpose-list">
      {purposes.map(renderPurposeListItem)}
    </div>
  );
}

const purposePropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.shape({
    fi: PropTypes.string.isRequired,
  }).isRequired,
});

PurposeListComponent.propTypes = {
  purposes: PropTypes.arrayOf(purposePropType).isRequired,
};

export default PurposeListComponent;