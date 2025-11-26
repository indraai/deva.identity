"use strict";
// Copyright ©2000-2025 Quinn A Michaels; All rights reserved. 
// Legal Signature Required For Lawful Use.
// Distributed under VLA:70495219266813465441 LICENSE.md
//  Tuesday, November 25, 2025 - 2:25:51 AM

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
