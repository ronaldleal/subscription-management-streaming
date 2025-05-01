export class SubscriptionId {
    private readonly value: string;

    constructor(value: string) {
        this.validate(value);
        this.value = value;
    }

    private validate(value: string): void {
        if (!value || value.trim().length === 0) {
            throw new Error('Subscription ID cannot be empty.');
        }
        // Additional validation rules can be added here
    }

    public getValue(): string {
        return this.value;
    }

    public equals(other: SubscriptionId): boolean {
        return this.value === other.value;
    }
}