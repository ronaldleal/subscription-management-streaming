export class SubscriptionApi {
    private apiUrl: string =  'http://localhost:3000/subscriptions';

    async fetchSubscriptionPlans(): Promise<any> {
        const response = await fetch(`${this.apiUrl}/plans`);
        if (!response.ok) {
            throw new Error('Failed to fetch subscription plans');
        }
        return await response.json();
    }

    async fetchSubscriptionById(subscriptionId: string): Promise<any> {
        const response = await fetch(`${this.apiUrl}/${subscriptionId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch subscription');
        }
        return await response.json();
    }

    async createSubscription(subscriptionData: any): Promise<any> {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(subscriptionData),
        });
        if (!response.ok) {
            throw new Error('Failed to create subscription');
        }
        return await response.json();
    }

    async updateSubscription(subscriptionId: string, subscriptionData: any): Promise<any> {
        const response = await fetch(`${this.apiUrl}/${subscriptionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(subscriptionData),
        });
        if (!response.ok) {
            throw new Error('Failed to update subscription');
        }
        return await response.json();
    }

    async cancelSubscription(subscriptionId: string): Promise<any> {
        const response = await fetch(`${this.apiUrl}/${subscriptionId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to cancel subscription');
        }
        return await response.json();
    }
}