"use strict";
// Identity Deva Feature Methods
// Copyright ©2000-2026 Quinn America Michaels; All rights reserved. 
// Legal Signature Required For Lawful Use.
// Distributed under VLA:48126115987492261100 LICENSE.md
// Wednesday, June 24, 2026 - 3:48:24 PM PST

export default {
  /**************
  method: identity
  params: packet
  describe: The global identity feature that installs with every agent
  ***************/
  async identity(packet) {
    const id = this.uid();
    const client = this.client();
    const agent = this.agent();
    
    const data = {
      id,
      client: {
        key: client.key,
        name: client.profile.name,
        company: client.profile.company,
        copyright: client.profile.copyright,
      },
      agent: {
        key: agent.key,
        name: agent.profile.name,
        hashtag: agent.profile.hashtag,
        company: agent.profile.company || client.profile.company,
        copyright: agent.profile.copyright,
      },
    }
    data.client.fingerprint = this.hash(data.client, 'sha256');
    data.agent.fingerprint = this.hash(data.agent, 'sha256');

    const text = [
      `${this.box.begin}:${agent.key}:identity:${id.uid}`,
      `## UID`,
      `id: ${data.id.uid}`,
      `time: ${data.id.time}`,
      `date: ${data.id.date}`,
      `warning: ${data.id.warning}`,
      `license: ${data.id.license}`,
      `fingerprint: ${data.id.fingerprint}`,
      `copyright: ${data.id.copyright}`,
      '---',
      `## Client`,
      `key: ${data.client.key}`,
      `name: ${data.client.name}`,
      `company: ${data.client.company}`,
      `fingerprint: ${data.client.fingerprint}`,
      `copyright: ${data.client.copyright}`,
      '---',
      `## Agent`,
      `key: ${data.agent.key}`,
      `name: ${data.agent.name}`,
      `hashtag: ${data.agent.hashtag}`,
      `company: ${data.agent.company}`,
      `fingerprint: ${data.agent.fingerprint}`,
      `copyright: ${data.agent.copyright}`,
      `${this.box.end}:${agent.key}:identity:${id.uid}`,
    ].join('\n');

    return {
      text,
      html: false,
      data,
    };
  },
};
