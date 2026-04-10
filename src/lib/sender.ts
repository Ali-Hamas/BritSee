import { SettingsService } from './settings';

export interface CampaignConfig {
  campaignName: string;
  senderName: string;
  subject: string;
  htmlContent: string;
  recipients: string[];
  smtpAccountIds?: string[];
}

export const SenderService = {
  async launchCampaign(config: CampaignConfig) {
    const apiKey = SettingsService.getLeadHunterApiKey();
    const baseUrl = SettingsService.getLeadHunterBaseUrl();

    // The LeadHunter Sender API expects specific fields
    const payload = {
      name: config.campaignName,
      sender_name: config.senderName,
      subject: config.subject,
      body: config.htmlContent,
      list_id: config.recipients.join(','), // Simple comma-sep list for now
      smtp_server_ids: config.smtpAccountIds || []
    };

    const response = await fetch(`${baseUrl}/api/v1/sender/campaigns`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to launch campaign');
    }

    return await response.json();
  },

  async getCampaigns() {
    const apiKey = SettingsService.getLeadHunterApiKey();
    const baseUrl = SettingsService.getLeadHunterBaseUrl();

    const response = await fetch(`${baseUrl}/api/v1/sender/campaigns`, {
      headers: { 'X-API-KEY': apiKey }
    });
    
    if (!response.ok) throw new Error('Failed to fetch campaigns');
    return await response.json();
  }
};
