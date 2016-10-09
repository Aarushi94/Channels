'use strict';

import crypto from 'crypto';
mongoose.Promise = require('bluebird');
import mongoose, {
  Schema
} from 'mongoose';
import Organisation from '../../api/organisation/organisation.model';
import User from '../../api/user/user.model';
import Channel from './channel.model';

var TeamSchema = new Schema({
  name: String,
  organisation: {
    type: Schema.Types.ObjectId,
    ref: 'Organisation'
  },
  members: [{
    member: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    role: String
  }],
  channels: [{
    type: Schema.Types.ObjectId,
    ref: 'Channel'
  }]
});

export default mongoose.model('Team', TeamSchema);
