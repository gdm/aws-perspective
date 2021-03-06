const chai = require('chai');
const spot = require('../src/discovery/spot');
const mockEC2Api = require('./mockAwsEC2');
const DataClientMock = require('./mockDataClient');

const util = require('util');

const expect = chai.expect;
const assert = chai.assert;
const should = require('chai').should();

it('Should correctly call processSpotFleet', async () => {
    const spotObject = new spot(() => { return mockEC2Api }, DataClientMock);
    const result = await spotObject.processSpotFleet("XXXXXXXXXXXX", "eu-west-1", "sfr-9536e0b4-cb5c-4ffe-bfda-5856fe4174e2");
    console.log(util.inspect(result, { depth: 20 }));

    const expected = [{
        resourceId: 'sfr-9536e0b4-cb5c-4ffe-bfda-5856fe4174e2',
        resourceType: 'AWS::EC2::SpotFleet',
        accountId: 'XXXXXXXXXXXX',
        properties:
        {
            resourceId: 'sfr-9536e0b4-cb5c-4ffe-bfda-5856fe4174e2',
            resourceType: 'AWS::EC2::SpotFleet',
            accountId: 'XXXXXXXXXXXX',
            awsRegion: 'eu-west-1',
            activityStatus: 'fulfilled',
            createdTime: '2019-08-29T12:59:59.401Z',
            spotFleetRequestConfig:
            {
                AllocationStrategy: 'diversified',
                OnDemandAllocationStrategy: 'lowestPrice',
                ClientToken: 'EC2Co-EcsSp-19V2HOYHACE73',
                ExcessCapacityTerminationPolicy: 'Default',
                FulfilledCapacity: 3,
                OnDemandFulfilledCapacity: 0,
                IamFleetRole: 'arn:aws:iam::XXXXXXXXXXXX:role/ecsSpotFleetRole',
                LaunchSpecifications:
                    [{
                        SecurityGroups: [{ GroupId: 'sg-02f1d28a9053eb785' }],
                        BlockDeviceMappings:
                            [{
                                DeviceName: '/dev/xvdcz',
                                Ebs: { VolumeSize: 22, VolumeType: 'gp2' }
                            }],
                        IamInstanceProfile:
                            { Arn: 'arn:aws:iam::XXXXXXXXXXXX:instance-profile/ecsInstanceRole' },
                        ImageId: 'ami-0a5532e0793a984d9',
                        InstanceType: 'm1.medium',
                        Monitoring: { Enabled: true },
                        SubnetId: 'subnet-030b38057302520b3',
                        UserData:
                            'IyEvYmluL2Jhc2gKZWNobyBFQ1NfQ0xVU1RFUj1lY3MtdGVzdC1zcG90ID4+IC9ldGMvZWNzL2Vjcy5jb25maWc7ZWNobyBFQ1NfQkFDS0VORF9IT1NUPSA+PiAvZXRjL2Vjcy9lY3MuY29uZmlnOwpleHBvcnQgUEFUSD0vdXNyL2xvY2FsL2JpbjokUEFUSAp5dW0gLXkgaW5zdGFsbCBqcQplYXN5X2luc3RhbGwgcGlwCnBpcCBpbnN0YWxsIGF3c2NsaQphd3MgY29uZmlndXJlIHNldCBkZWZhdWx0LnJlZ2lvbiBldS13ZXN0LTEKY2F0IDw8RU9GID4gL2V0Yy9pbml0L3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuY29uZgpkZXNjcmlwdGlvbiAiU3RhcnQgc3BvdCBpbnN0YW5jZSB0ZXJtaW5hdGlvbiBoYW5kbGVyIG1vbml0b3Jpbmcgc2NyaXB0IgphdXRob3IgIkFtYXpvbiBXZWIgU2VydmljZXMiCnN0YXJ0IG9uIHN0YXJ0ZWQgZWNzCnNjcmlwdAplY2hvIFwkXCQgPiAvdmFyL3J1bi9zcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnBpZApleGVjIC91c3IvbG9jYWwvYmluL3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2gKZW5kIHNjcmlwdApwcmUtc3RhcnQgc2NyaXB0CmxvZ2dlciAiW3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2hdOiBzcG90IGluc3RhbmNlIHRlcm1pbmF0aW9uCm5vdGljZSBoYW5kbGVyIHN0YXJ0ZWQiCmVuZCBzY3JpcHQKRU9GCmNhdCA8PEVPRiA+IC91c3IvbG9jYWwvYmluL3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2gKIyEvYmluL2Jhc2gKd2hpbGUgc2xlZXAgNTsgZG8KaWYgWyAteiBcJChjdXJsIC1Jc2YgaHR0cDovLzE2OS4yNTQuMTY5LjI1NC9sYXRlc3QvbWV0YS1kYXRhL3Nwb3QvdGVybWluYXRpb24tdGltZSldOyB0aGVuCi9iaW4vZmFsc2UKZWxzZQpsb2dnZXIgIltzcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnNoXTogc3BvdCBpbnN0YW5jZSB0ZXJtaW5hdGlvbiBub3RpY2UgZGV0ZWN0ZWQiClNUQVRVUz1EUkFJTklORwpFQ1NfQ0xVU1RFUj1cJChjdXJsIC1zIGh0dHA6Ly9sb2NhbGhvc3Q6NTE2NzgvdjEvbWV0YWRhdGEgfCBqcSAuQ2x1c3RlciB8IHRyIC1kIFwiKQpDT05UQUlORVJfSU5TVEFOQ0U9XCQoY3VybCAtcyBodHRwOi8vbG9jYWxob3N0OjUxNjc4L3YxL21ldGFkYXRhIHwganEgLkNvbnRhaW5lckluc3RhbmNlQXJuIHwgdHIgLWQgXCIpCmxvZ2dlciAiW3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2hdOiBwdXR0aW5nIGluc3RhbmNlIGluIHN0YXRlIFwkU1RBVFVTIgoKL3Vzci9sb2NhbC9iaW4vYXdzICBlY3MgdXBkYXRlLWNvbnRhaW5lci1pbnN0YW5jZXMtc3RhdGUgLS1jbHVzdGVyIFwkRUNTX0NMVVNURVIgLS1jb250YWluZXItaW5zdGFuY2VzIFwkQ09OVEFJTkVSX0lOU1RBTkNFIC0tc3RhdHVzIFwkU1RBVFVTCgpsb2dnZXIgIltzcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnNoXTogcHV0dGluZyBteXNlbGYgdG8gc2xlZXAuLi4iCnNsZWVwIDEyMCAjIGV4aXQgbG9vcCBhcyBpbnN0YW5jZSBleHBpcmVzIGluIDEyMCBzZWNzIGFmdGVyIHRlcm1pbmF0aW5nIG5vdGlmaWNhdGlvbgpmaQpkb25lCkVPRgpjaG1vZCAreCAvdXNyL2xvY2FsL2Jpbi9zcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnNo'
                    },
                    {
                        SecurityGroups: [{ GroupId: 'sg-02f1d28a9053eb785' }],
                        BlockDeviceMappings:
                            [{
                                DeviceName: '/dev/xvdcz',
                                Ebs: { VolumeSize: 22, VolumeType: 'gp2' }
                            }],
                        IamInstanceProfile:
                            { Arn: 'arn:aws:iam::XXXXXXXXXXXX:instance-profile/ecsInstanceRole' },
                        ImageId: 'ami-0a5532e0793a984d9',
                        InstanceType: 'm1.medium',
                        Monitoring: { Enabled: true },
                        SubnetId: 'subnet-0bfa3aa9767d523df',
                        UserData:
                            'IyEvYmluL2Jhc2gKZWNobyBFQ1NfQ0xVU1RFUj1lY3MtdGVzdC1zcG90ID4+IC9ldGMvZWNzL2Vjcy5jb25maWc7ZWNobyBFQ1NfQkFDS0VORF9IT1NUPSA+PiAvZXRjL2Vjcy9lY3MuY29uZmlnOwpleHBvcnQgUEFUSD0vdXNyL2xvY2FsL2JpbjokUEFUSAp5dW0gLXkgaW5zdGFsbCBqcQplYXN5X2luc3RhbGwgcGlwCnBpcCBpbnN0YWxsIGF3c2NsaQphd3MgY29uZmlndXJlIHNldCBkZWZhdWx0LnJlZ2lvbiBldS13ZXN0LTEKY2F0IDw8RU9GID4gL2V0Yy9pbml0L3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuY29uZgpkZXNjcmlwdGlvbiAiU3RhcnQgc3BvdCBpbnN0YW5jZSB0ZXJtaW5hdGlvbiBoYW5kbGVyIG1vbml0b3Jpbmcgc2NyaXB0IgphdXRob3IgIkFtYXpvbiBXZWIgU2VydmljZXMiCnN0YXJ0IG9uIHN0YXJ0ZWQgZWNzCnNjcmlwdAplY2hvIFwkXCQgPiAvdmFyL3J1bi9zcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnBpZApleGVjIC91c3IvbG9jYWwvYmluL3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2gKZW5kIHNjcmlwdApwcmUtc3RhcnQgc2NyaXB0CmxvZ2dlciAiW3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2hdOiBzcG90IGluc3RhbmNlIHRlcm1pbmF0aW9uCm5vdGljZSBoYW5kbGVyIHN0YXJ0ZWQiCmVuZCBzY3JpcHQKRU9GCmNhdCA8PEVPRiA+IC91c3IvbG9jYWwvYmluL3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2gKIyEvYmluL2Jhc2gKd2hpbGUgc2xlZXAgNTsgZG8KaWYgWyAteiBcJChjdXJsIC1Jc2YgaHR0cDovLzE2OS4yNTQuMTY5LjI1NC9sYXRlc3QvbWV0YS1kYXRhL3Nwb3QvdGVybWluYXRpb24tdGltZSldOyB0aGVuCi9iaW4vZmFsc2UKZWxzZQpsb2dnZXIgIltzcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnNoXTogc3BvdCBpbnN0YW5jZSB0ZXJtaW5hdGlvbiBub3RpY2UgZGV0ZWN0ZWQiClNUQVRVUz1EUkFJTklORwpFQ1NfQ0xVU1RFUj1cJChjdXJsIC1zIGh0dHA6Ly9sb2NhbGhvc3Q6NTE2NzgvdjEvbWV0YWRhdGEgfCBqcSAuQ2x1c3RlciB8IHRyIC1kIFwiKQpDT05UQUlORVJfSU5TVEFOQ0U9XCQoY3VybCAtcyBodHRwOi8vbG9jYWxob3N0OjUxNjc4L3YxL21ldGFkYXRhIHwganEgLkNvbnRhaW5lckluc3RhbmNlQXJuIHwgdHIgLWQgXCIpCmxvZ2dlciAiW3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2hdOiBwdXR0aW5nIGluc3RhbmNlIGluIHN0YXRlIFwkU1RBVFVTIgoKL3Vzci9sb2NhbC9iaW4vYXdzICBlY3MgdXBkYXRlLWNvbnRhaW5lci1pbnN0YW5jZXMtc3RhdGUgLS1jbHVzdGVyIFwkRUNTX0NMVVNURVIgLS1jb250YWluZXItaW5zdGFuY2VzIFwkQ09OVEFJTkVSX0lOU1RBTkNFIC0tc3RhdHVzIFwkU1RBVFVTCgpsb2dnZXIgIltzcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnNoXTogcHV0dGluZyBteXNlbGYgdG8gc2xlZXAuLi4iCnNsZWVwIDEyMCAjIGV4aXQgbG9vcCBhcyBpbnN0YW5jZSBleHBpcmVzIGluIDEyMCBzZWNzIGFmdGVyIHRlcm1pbmF0aW5nIG5vdGlmaWNhdGlvbgpmaQpkb25lCkVPRgpjaG1vZCAreCAvdXNyL2xvY2FsL2Jpbi9zcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnNo'
                    },
                    {
                        SecurityGroups: [{ GroupId: 'sg-02f1d28a9053eb785' }],
                        BlockDeviceMappings:
                            [{
                                DeviceName: '/dev/xvdcz',
                                Ebs: { VolumeSize: 22, VolumeType: 'gp2' }
                            }],
                        IamInstanceProfile:
                            { Arn: 'arn:aws:iam::XXXXXXXXXXXX:instance-profile/ecsInstanceRole' },
                        ImageId: 'ami-0a5532e0793a984d9',
                        InstanceType: 'm1.xlarge',
                        Monitoring: { Enabled: true },
                        SubnetId: 'subnet-030b38057302520b3',
                        UserData:
                            'IyEvYmluL2Jhc2gKZWNobyBFQ1NfQ0xVU1RFUj1lY3MtdGVzdC1zcG90ID4+IC9ldGMvZWNzL2Vjcy5jb25maWc7ZWNobyBFQ1NfQkFDS0VORF9IT1NUPSA+PiAvZXRjL2Vjcy9lY3MuY29uZmlnOwpleHBvcnQgUEFUSD0vdXNyL2xvY2FsL2JpbjokUEFUSAp5dW0gLXkgaW5zdGFsbCBqcQplYXN5X2luc3RhbGwgcGlwCnBpcCBpbnN0YWxsIGF3c2NsaQphd3MgY29uZmlndXJlIHNldCBkZWZhdWx0LnJlZ2lvbiBldS13ZXN0LTEKY2F0IDw8RU9GID4gL2V0Yy9pbml0L3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuY29uZgpkZXNjcmlwdGlvbiAiU3RhcnQgc3BvdCBpbnN0YW5jZSB0ZXJtaW5hdGlvbiBoYW5kbGVyIG1vbml0b3Jpbmcgc2NyaXB0IgphdXRob3IgIkFtYXpvbiBXZWIgU2VydmljZXMiCnN0YXJ0IG9uIHN0YXJ0ZWQgZWNzCnNjcmlwdAplY2hvIFwkXCQgPiAvdmFyL3J1bi9zcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnBpZApleGVjIC91c3IvbG9jYWwvYmluL3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2gKZW5kIHNjcmlwdApwcmUtc3RhcnQgc2NyaXB0CmxvZ2dlciAiW3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2hdOiBzcG90IGluc3RhbmNlIHRlcm1pbmF0aW9uCm5vdGljZSBoYW5kbGVyIHN0YXJ0ZWQiCmVuZCBzY3JpcHQKRU9GCmNhdCA8PEVPRiA+IC91c3IvbG9jYWwvYmluL3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2gKIyEvYmluL2Jhc2gKd2hpbGUgc2xlZXAgNTsgZG8KaWYgWyAteiBcJChjdXJsIC1Jc2YgaHR0cDovLzE2OS4yNTQuMTY5LjI1NC9sYXRlc3QvbWV0YS1kYXRhL3Nwb3QvdGVybWluYXRpb24tdGltZSldOyB0aGVuCi9iaW4vZmFsc2UKZWxzZQpsb2dnZXIgIltzcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnNoXTogc3BvdCBpbnN0YW5jZSB0ZXJtaW5hdGlvbiBub3RpY2UgZGV0ZWN0ZWQiClNUQVRVUz1EUkFJTklORwpFQ1NfQ0xVU1RFUj1cJChjdXJsIC1zIGh0dHA6Ly9sb2NhbGhvc3Q6NTE2NzgvdjEvbWV0YWRhdGEgfCBqcSAuQ2x1c3RlciB8IHRyIC1kIFwiKQpDT05UQUlORVJfSU5TVEFOQ0U9XCQoY3VybCAtcyBodHRwOi8vbG9jYWxob3N0OjUxNjc4L3YxL21ldGFkYXRhIHwganEgLkNvbnRhaW5lckluc3RhbmNlQXJuIHwgdHIgLWQgXCIpCmxvZ2dlciAiW3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2hdOiBwdXR0aW5nIGluc3RhbmNlIGluIHN0YXRlIFwkU1RBVFVTIgoKL3Vzci9sb2NhbC9iaW4vYXdzICBlY3MgdXBkYXRlLWNvbnRhaW5lci1pbnN0YW5jZXMtc3RhdGUgLS1jbHVzdGVyIFwkRUNTX0NMVVNURVIgLS1jb250YWluZXItaW5zdGFuY2VzIFwkQ09OVEFJTkVSX0lOU1RBTkNFIC0tc3RhdHVzIFwkU1RBVFVTCgpsb2dnZXIgIltzcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnNoXTogcHV0dGluZyBteXNlbGYgdG8gc2xlZXAuLi4iCnNsZWVwIDEyMCAjIGV4aXQgbG9vcCBhcyBpbnN0YW5jZSBleHBpcmVzIGluIDEyMCBzZWNzIGFmdGVyIHRlcm1pbmF0aW5nIG5vdGlmaWNhdGlvbgpmaQpkb25lCkVPRgpjaG1vZCAreCAvdXNyL2xvY2FsL2Jpbi9zcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnNo'
                    },
                    {
                        SecurityGroups: [{ GroupId: 'sg-02f1d28a9053eb785' }],
                        BlockDeviceMappings:
                            [{
                                DeviceName: '/dev/xvdcz',
                                Ebs: { VolumeSize: 22, VolumeType: 'gp2' }
                            }],
                        IamInstanceProfile:
                            { Arn: 'arn:aws:iam::XXXXXXXXXXXX:instance-profile/ecsInstanceRole' },
                        ImageId: 'ami-0a5532e0793a984d9',
                        InstanceType: 'm1.xlarge',
                        Monitoring: { Enabled: true },
                        SubnetId: 'subnet-0bfa3aa9767d523df',
                        UserData:
                            'IyEvYmluL2Jhc2gKZWNobyBFQ1NfQ0xVU1RFUj1lY3MtdGVzdC1zcG90ID4+IC9ldGMvZWNzL2Vjcy5jb25maWc7ZWNobyBFQ1NfQkFDS0VORF9IT1NUPSA+PiAvZXRjL2Vjcy9lY3MuY29uZmlnOwpleHBvcnQgUEFUSD0vdXNyL2xvY2FsL2JpbjokUEFUSAp5dW0gLXkgaW5zdGFsbCBqcQplYXN5X2luc3RhbGwgcGlwCnBpcCBpbnN0YWxsIGF3c2NsaQphd3MgY29uZmlndXJlIHNldCBkZWZhdWx0LnJlZ2lvbiBldS13ZXN0LTEKY2F0IDw8RU9GID4gL2V0Yy9pbml0L3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuY29uZgpkZXNjcmlwdGlvbiAiU3RhcnQgc3BvdCBpbnN0YW5jZSB0ZXJtaW5hdGlvbiBoYW5kbGVyIG1vbml0b3Jpbmcgc2NyaXB0IgphdXRob3IgIkFtYXpvbiBXZWIgU2VydmljZXMiCnN0YXJ0IG9uIHN0YXJ0ZWQgZWNzCnNjcmlwdAplY2hvIFwkXCQgPiAvdmFyL3J1bi9zcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnBpZApleGVjIC91c3IvbG9jYWwvYmluL3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2gKZW5kIHNjcmlwdApwcmUtc3RhcnQgc2NyaXB0CmxvZ2dlciAiW3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2hdOiBzcG90IGluc3RhbmNlIHRlcm1pbmF0aW9uCm5vdGljZSBoYW5kbGVyIHN0YXJ0ZWQiCmVuZCBzY3JpcHQKRU9GCmNhdCA8PEVPRiA+IC91c3IvbG9jYWwvYmluL3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2gKIyEvYmluL2Jhc2gKd2hpbGUgc2xlZXAgNTsgZG8KaWYgWyAteiBcJChjdXJsIC1Jc2YgaHR0cDovLzE2OS4yNTQuMTY5LjI1NC9sYXRlc3QvbWV0YS1kYXRhL3Nwb3QvdGVybWluYXRpb24tdGltZSldOyB0aGVuCi9iaW4vZmFsc2UKZWxzZQpsb2dnZXIgIltzcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnNoXTogc3BvdCBpbnN0YW5jZSB0ZXJtaW5hdGlvbiBub3RpY2UgZGV0ZWN0ZWQiClNUQVRVUz1EUkFJTklORwpFQ1NfQ0xVU1RFUj1cJChjdXJsIC1zIGh0dHA6Ly9sb2NhbGhvc3Q6NTE2NzgvdjEvbWV0YWRhdGEgfCBqcSAuQ2x1c3RlciB8IHRyIC1kIFwiKQpDT05UQUlORVJfSU5TVEFOQ0U9XCQoY3VybCAtcyBodHRwOi8vbG9jYWxob3N0OjUxNjc4L3YxL21ldGFkYXRhIHwganEgLkNvbnRhaW5lckluc3RhbmNlQXJuIHwgdHIgLWQgXCIpCmxvZ2dlciAiW3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2hdOiBwdXR0aW5nIGluc3RhbmNlIGluIHN0YXRlIFwkU1RBVFVTIgoKL3Vzci9sb2NhbC9iaW4vYXdzICBlY3MgdXBkYXRlLWNvbnRhaW5lci1pbnN0YW5jZXMtc3RhdGUgLS1jbHVzdGVyIFwkRUNTX0NMVVNURVIgLS1jb250YWluZXItaW5zdGFuY2VzIFwkQ09OVEFJTkVSX0lOU1RBTkNFIC0tc3RhdHVzIFwkU1RBVFVTCgpsb2dnZXIgIltzcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnNoXTogcHV0dGluZyBteXNlbGYgdG8gc2xlZXAuLi4iCnNsZWVwIDEyMCAjIGV4aXQgbG9vcCBhcyBpbnN0YW5jZSBleHBpcmVzIGluIDEyMCBzZWNzIGFmdGVyIHRlcm1pbmF0aW5nIG5vdGlmaWNhdGlvbgpmaQpkb25lCkVPRgpjaG1vZCAreCAvdXNyL2xvY2FsL2Jpbi9zcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnNo'
                    },
                    {
                        SecurityGroups: [{ GroupId: 'sg-02f1d28a9053eb785' }],
                        BlockDeviceMappings:
                            [{
                                DeviceName: '/dev/xvdcz',
                                Ebs: { VolumeSize: 22, VolumeType: 'gp2' }
                            }],
                        IamInstanceProfile:
                            { Arn: 'arn:aws:iam::XXXXXXXXXXXX:instance-profile/ecsInstanceRole' },
                        ImageId: 'ami-0a5532e0793a984d9',
                        InstanceType: 'm3.2xlarge',
                        Monitoring: { Enabled: true },
                        SubnetId: 'subnet-030b38057302520b3',
                        UserData:
                            'IyEvYmluL2Jhc2gKZWNobyBFQ1NfQ0xVU1RFUj1lY3MtdGVzdC1zcG90ID4+IC9ldGMvZWNzL2Vjcy5jb25maWc7ZWNobyBFQ1NfQkFDS0VORF9IT1NUPSA+PiAvZXRjL2Vjcy9lY3MuY29uZmlnOwpleHBvcnQgUEFUSD0vdXNyL2xvY2FsL2JpbjokUEFUSAp5dW0gLXkgaW5zdGFsbCBqcQplYXN5X2luc3RhbGwgcGlwCnBpcCBpbnN0YWxsIGF3c2NsaQphd3MgY29uZmlndXJlIHNldCBkZWZhdWx0LnJlZ2lvbiBldS13ZXN0LTEKY2F0IDw8RU9GID4gL2V0Yy9pbml0L3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuY29uZgpkZXNjcmlwdGlvbiAiU3RhcnQgc3BvdCBpbnN0YW5jZSB0ZXJtaW5hdGlvbiBoYW5kbGVyIG1vbml0b3Jpbmcgc2NyaXB0IgphdXRob3IgIkFtYXpvbiBXZWIgU2VydmljZXMiCnN0YXJ0IG9uIHN0YXJ0ZWQgZWNzCnNjcmlwdAplY2hvIFwkXCQgPiAvdmFyL3J1bi9zcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnBpZApleGVjIC91c3IvbG9jYWwvYmluL3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2gKZW5kIHNjcmlwdApwcmUtc3RhcnQgc2NyaXB0CmxvZ2dlciAiW3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2hdOiBzcG90IGluc3RhbmNlIHRlcm1pbmF0aW9uCm5vdGljZSBoYW5kbGVyIHN0YXJ0ZWQiCmVuZCBzY3JpcHQKRU9GCmNhdCA8PEVPRiA+IC91c3IvbG9jYWwvYmluL3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2gKIyEvYmluL2Jhc2gKd2hpbGUgc2xlZXAgNTsgZG8KaWYgWyAteiBcJChjdXJsIC1Jc2YgaHR0cDovLzE2OS4yNTQuMTY5LjI1NC9sYXRlc3QvbWV0YS1kYXRhL3Nwb3QvdGVybWluYXRpb24tdGltZSldOyB0aGVuCi9iaW4vZmFsc2UKZWxzZQpsb2dnZXIgIltzcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnNoXTogc3BvdCBpbnN0YW5jZSB0ZXJtaW5hdGlvbiBub3RpY2UgZGV0ZWN0ZWQiClNUQVRVUz1EUkFJTklORwpFQ1NfQ0xVU1RFUj1cJChjdXJsIC1zIGh0dHA6Ly9sb2NhbGhvc3Q6NTE2NzgvdjEvbWV0YWRhdGEgfCBqcSAuQ2x1c3RlciB8IHRyIC1kIFwiKQpDT05UQUlORVJfSU5TVEFOQ0U9XCQoY3VybCAtcyBodHRwOi8vbG9jYWxob3N0OjUxNjc4L3YxL21ldGFkYXRhIHwganEgLkNvbnRhaW5lckluc3RhbmNlQXJuIHwgdHIgLWQgXCIpCmxvZ2dlciAiW3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2hdOiBwdXR0aW5nIGluc3RhbmNlIGluIHN0YXRlIFwkU1RBVFVTIgoKL3Vzci9sb2NhbC9iaW4vYXdzICBlY3MgdXBkYXRlLWNvbnRhaW5lci1pbnN0YW5jZXMtc3RhdGUgLS1jbHVzdGVyIFwkRUNTX0NMVVNURVIgLS1jb250YWluZXItaW5zdGFuY2VzIFwkQ09OVEFJTkVSX0lOU1RBTkNFIC0tc3RhdHVzIFwkU1RBVFVTCgpsb2dnZXIgIltzcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnNoXTogcHV0dGluZyBteXNlbGYgdG8gc2xlZXAuLi4iCnNsZWVwIDEyMCAjIGV4aXQgbG9vcCBhcyBpbnN0YW5jZSBleHBpcmVzIGluIDEyMCBzZWNzIGFmdGVyIHRlcm1pbmF0aW5nIG5vdGlmaWNhdGlvbgpmaQpkb25lCkVPRgpjaG1vZCAreCAvdXNyL2xvY2FsL2Jpbi9zcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnNo'
                    },
                    {
                        SecurityGroups: [{ GroupId: 'sg-02f1d28a9053eb785' }],
                        BlockDeviceMappings:
                            [{
                                DeviceName: '/dev/xvdcz',
                                Ebs: { VolumeSize: 22, VolumeType: 'gp2' }
                            }],
                        IamInstanceProfile:
                            { Arn: 'arn:aws:iam::XXXXXXXXXXXX:instance-profile/ecsInstanceRole' },
                        ImageId: 'ami-0a5532e0793a984d9',
                        InstanceType: 'm3.2xlarge',
                        Monitoring: { Enabled: true },
                        SubnetId: 'subnet-0bfa3aa9767d523df',
                        UserData:
                            'IyEvYmluL2Jhc2gKZWNobyBFQ1NfQ0xVU1RFUj1lY3MtdGVzdC1zcG90ID4+IC9ldGMvZWNzL2Vjcy5jb25maWc7ZWNobyBFQ1NfQkFDS0VORF9IT1NUPSA+PiAvZXRjL2Vjcy9lY3MuY29uZmlnOwpleHBvcnQgUEFUSD0vdXNyL2xvY2FsL2JpbjokUEFUSAp5dW0gLXkgaW5zdGFsbCBqcQplYXN5X2luc3RhbGwgcGlwCnBpcCBpbnN0YWxsIGF3c2NsaQphd3MgY29uZmlndXJlIHNldCBkZWZhdWx0LnJlZ2lvbiBldS13ZXN0LTEKY2F0IDw8RU9GID4gL2V0Yy9pbml0L3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuY29uZgpkZXNjcmlwdGlvbiAiU3RhcnQgc3BvdCBpbnN0YW5jZSB0ZXJtaW5hdGlvbiBoYW5kbGVyIG1vbml0b3Jpbmcgc2NyaXB0IgphdXRob3IgIkFtYXpvbiBXZWIgU2VydmljZXMiCnN0YXJ0IG9uIHN0YXJ0ZWQgZWNzCnNjcmlwdAplY2hvIFwkXCQgPiAvdmFyL3J1bi9zcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnBpZApleGVjIC91c3IvbG9jYWwvYmluL3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2gKZW5kIHNjcmlwdApwcmUtc3RhcnQgc2NyaXB0CmxvZ2dlciAiW3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2hdOiBzcG90IGluc3RhbmNlIHRlcm1pbmF0aW9uCm5vdGljZSBoYW5kbGVyIHN0YXJ0ZWQiCmVuZCBzY3JpcHQKRU9GCmNhdCA8PEVPRiA+IC91c3IvbG9jYWwvYmluL3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2gKIyEvYmluL2Jhc2gKd2hpbGUgc2xlZXAgNTsgZG8KaWYgWyAteiBcJChjdXJsIC1Jc2YgaHR0cDovLzE2OS4yNTQuMTY5LjI1NC9sYXRlc3QvbWV0YS1kYXRhL3Nwb3QvdGVybWluYXRpb24tdGltZSldOyB0aGVuCi9iaW4vZmFsc2UKZWxzZQpsb2dnZXIgIltzcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnNoXTogc3BvdCBpbnN0YW5jZSB0ZXJtaW5hdGlvbiBub3RpY2UgZGV0ZWN0ZWQiClNUQVRVUz1EUkFJTklORwpFQ1NfQ0xVU1RFUj1cJChjdXJsIC1zIGh0dHA6Ly9sb2NhbGhvc3Q6NTE2NzgvdjEvbWV0YWRhdGEgfCBqcSAuQ2x1c3RlciB8IHRyIC1kIFwiKQpDT05UQUlORVJfSU5TVEFOQ0U9XCQoY3VybCAtcyBodHRwOi8vbG9jYWxob3N0OjUxNjc4L3YxL21ldGFkYXRhIHwganEgLkNvbnRhaW5lckluc3RhbmNlQXJuIHwgdHIgLWQgXCIpCmxvZ2dlciAiW3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2hdOiBwdXR0aW5nIGluc3RhbmNlIGluIHN0YXRlIFwkU1RBVFVTIgoKL3Vzci9sb2NhbC9iaW4vYXdzICBlY3MgdXBkYXRlLWNvbnRhaW5lci1pbnN0YW5jZXMtc3RhdGUgLS1jbHVzdGVyIFwkRUNTX0NMVVNURVIgLS1jb250YWluZXItaW5zdGFuY2VzIFwkQ09OVEFJTkVSX0lOU1RBTkNFIC0tc3RhdHVzIFwkU1RBVFVTCgpsb2dnZXIgIltzcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnNoXTogcHV0dGluZyBteXNlbGYgdG8gc2xlZXAuLi4iCnNsZWVwIDEyMCAjIGV4aXQgbG9vcCBhcyBpbnN0YW5jZSBleHBpcmVzIGluIDEyMCBzZWNzIGFmdGVyIHRlcm1pbmF0aW5nIG5vdGlmaWNhdGlvbgpmaQpkb25lCkVPRgpjaG1vZCAreCAvdXNyL2xvY2FsL2Jpbi9zcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnNo'
                    },
                    {
                        SecurityGroups: [{ GroupId: 'sg-02f1d28a9053eb785' }],
                        BlockDeviceMappings:
                            [{
                                DeviceName: '/dev/xvdcz',
                                Ebs: { VolumeSize: 22, VolumeType: 'gp2' }
                            }],
                        IamInstanceProfile:
                            { Arn: 'arn:aws:iam::XXXXXXXXXXXX:instance-profile/ecsInstanceRole' },
                        ImageId: 'ami-0a5532e0793a984d9',
                        InstanceType: 'm4.xlarge',
                        Monitoring: { Enabled: true },
                        SubnetId: 'subnet-030b38057302520b3',
                        UserData:
                            'IyEvYmluL2Jhc2gKZWNobyBFQ1NfQ0xVU1RFUj1lY3MtdGVzdC1zcG90ID4+IC9ldGMvZWNzL2Vjcy5jb25maWc7ZWNobyBFQ1NfQkFDS0VORF9IT1NUPSA+PiAvZXRjL2Vjcy9lY3MuY29uZmlnOwpleHBvcnQgUEFUSD0vdXNyL2xvY2FsL2JpbjokUEFUSAp5dW0gLXkgaW5zdGFsbCBqcQplYXN5X2luc3RhbGwgcGlwCnBpcCBpbnN0YWxsIGF3c2NsaQphd3MgY29uZmlndXJlIHNldCBkZWZhdWx0LnJlZ2lvbiBldS13ZXN0LTEKY2F0IDw8RU9GID4gL2V0Yy9pbml0L3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuY29uZgpkZXNjcmlwdGlvbiAiU3RhcnQgc3BvdCBpbnN0YW5jZSB0ZXJtaW5hdGlvbiBoYW5kbGVyIG1vbml0b3Jpbmcgc2NyaXB0IgphdXRob3IgIkFtYXpvbiBXZWIgU2VydmljZXMiCnN0YXJ0IG9uIHN0YXJ0ZWQgZWNzCnNjcmlwdAplY2hvIFwkXCQgPiAvdmFyL3J1bi9zcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnBpZApleGVjIC91c3IvbG9jYWwvYmluL3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2gKZW5kIHNjcmlwdApwcmUtc3RhcnQgc2NyaXB0CmxvZ2dlciAiW3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2hdOiBzcG90IGluc3RhbmNlIHRlcm1pbmF0aW9uCm5vdGljZSBoYW5kbGVyIHN0YXJ0ZWQiCmVuZCBzY3JpcHQKRU9GCmNhdCA8PEVPRiA+IC91c3IvbG9jYWwvYmluL3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2gKIyEvYmluL2Jhc2gKd2hpbGUgc2xlZXAgNTsgZG8KaWYgWyAteiBcJChjdXJsIC1Jc2YgaHR0cDovLzE2OS4yNTQuMTY5LjI1NC9sYXRlc3QvbWV0YS1kYXRhL3Nwb3QvdGVybWluYXRpb24tdGltZSldOyB0aGVuCi9iaW4vZmFsc2UKZWxzZQpsb2dnZXIgIltzcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnNoXTogc3BvdCBpbnN0YW5jZSB0ZXJtaW5hdGlvbiBub3RpY2UgZGV0ZWN0ZWQiClNUQVRVUz1EUkFJTklORwpFQ1NfQ0xVU1RFUj1cJChjdXJsIC1zIGh0dHA6Ly9sb2NhbGhvc3Q6NTE2NzgvdjEvbWV0YWRhdGEgfCBqcSAuQ2x1c3RlciB8IHRyIC1kIFwiKQpDT05UQUlORVJfSU5TVEFOQ0U9XCQoY3VybCAtcyBodHRwOi8vbG9jYWxob3N0OjUxNjc4L3YxL21ldGFkYXRhIHwganEgLkNvbnRhaW5lckluc3RhbmNlQXJuIHwgdHIgLWQgXCIpCmxvZ2dlciAiW3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2hdOiBwdXR0aW5nIGluc3RhbmNlIGluIHN0YXRlIFwkU1RBVFVTIgoKL3Vzci9sb2NhbC9iaW4vYXdzICBlY3MgdXBkYXRlLWNvbnRhaW5lci1pbnN0YW5jZXMtc3RhdGUgLS1jbHVzdGVyIFwkRUNTX0NMVVNURVIgLS1jb250YWluZXItaW5zdGFuY2VzIFwkQ09OVEFJTkVSX0lOU1RBTkNFIC0tc3RhdHVzIFwkU1RBVFVTCgpsb2dnZXIgIltzcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnNoXTogcHV0dGluZyBteXNlbGYgdG8gc2xlZXAuLi4iCnNsZWVwIDEyMCAjIGV4aXQgbG9vcCBhcyBpbnN0YW5jZSBleHBpcmVzIGluIDEyMCBzZWNzIGFmdGVyIHRlcm1pbmF0aW5nIG5vdGlmaWNhdGlvbgpmaQpkb25lCkVPRgpjaG1vZCAreCAvdXNyL2xvY2FsL2Jpbi9zcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnNo'
                    },
                    {
                        SecurityGroups: [{ GroupId: 'sg-02f1d28a9053eb785' }],
                        BlockDeviceMappings:
                            [{
                                DeviceName: '/dev/xvdcz',
                                Ebs: { VolumeSize: 22, VolumeType: 'gp2' }
                            }],
                        IamInstanceProfile:
                            { Arn: 'arn:aws:iam::XXXXXXXXXXXX:instance-profile/ecsInstanceRole' },
                        ImageId: 'ami-0a5532e0793a984d9',
                        InstanceType: 'm4.xlarge',
                        Monitoring: { Enabled: true },
                        SubnetId: 'subnet-0bfa3aa9767d523df',
                        UserData:
                            'IyEvYmluL2Jhc2gKZWNobyBFQ1NfQ0xVU1RFUj1lY3MtdGVzdC1zcG90ID4+IC9ldGMvZWNzL2Vjcy5jb25maWc7ZWNobyBFQ1NfQkFDS0VORF9IT1NUPSA+PiAvZXRjL2Vjcy9lY3MuY29uZmlnOwpleHBvcnQgUEFUSD0vdXNyL2xvY2FsL2JpbjokUEFUSAp5dW0gLXkgaW5zdGFsbCBqcQplYXN5X2luc3RhbGwgcGlwCnBpcCBpbnN0YWxsIGF3c2NsaQphd3MgY29uZmlndXJlIHNldCBkZWZhdWx0LnJlZ2lvbiBldS13ZXN0LTEKY2F0IDw8RU9GID4gL2V0Yy9pbml0L3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuY29uZgpkZXNjcmlwdGlvbiAiU3RhcnQgc3BvdCBpbnN0YW5jZSB0ZXJtaW5hdGlvbiBoYW5kbGVyIG1vbml0b3Jpbmcgc2NyaXB0IgphdXRob3IgIkFtYXpvbiBXZWIgU2VydmljZXMiCnN0YXJ0IG9uIHN0YXJ0ZWQgZWNzCnNjcmlwdAplY2hvIFwkXCQgPiAvdmFyL3J1bi9zcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnBpZApleGVjIC91c3IvbG9jYWwvYmluL3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2gKZW5kIHNjcmlwdApwcmUtc3RhcnQgc2NyaXB0CmxvZ2dlciAiW3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2hdOiBzcG90IGluc3RhbmNlIHRlcm1pbmF0aW9uCm5vdGljZSBoYW5kbGVyIHN0YXJ0ZWQiCmVuZCBzY3JpcHQKRU9GCmNhdCA8PEVPRiA+IC91c3IvbG9jYWwvYmluL3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2gKIyEvYmluL2Jhc2gKd2hpbGUgc2xlZXAgNTsgZG8KaWYgWyAteiBcJChjdXJsIC1Jc2YgaHR0cDovLzE2OS4yNTQuMTY5LjI1NC9sYXRlc3QvbWV0YS1kYXRhL3Nwb3QvdGVybWluYXRpb24tdGltZSldOyB0aGVuCi9iaW4vZmFsc2UKZWxzZQpsb2dnZXIgIltzcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnNoXTogc3BvdCBpbnN0YW5jZSB0ZXJtaW5hdGlvbiBub3RpY2UgZGV0ZWN0ZWQiClNUQVRVUz1EUkFJTklORwpFQ1NfQ0xVU1RFUj1cJChjdXJsIC1zIGh0dHA6Ly9sb2NhbGhvc3Q6NTE2NzgvdjEvbWV0YWRhdGEgfCBqcSAuQ2x1c3RlciB8IHRyIC1kIFwiKQpDT05UQUlORVJfSU5TVEFOQ0U9XCQoY3VybCAtcyBodHRwOi8vbG9jYWxob3N0OjUxNjc4L3YxL21ldGFkYXRhIHwganEgLkNvbnRhaW5lckluc3RhbmNlQXJuIHwgdHIgLWQgXCIpCmxvZ2dlciAiW3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2hdOiBwdXR0aW5nIGluc3RhbmNlIGluIHN0YXRlIFwkU1RBVFVTIgoKL3Vzci9sb2NhbC9iaW4vYXdzICBlY3MgdXBkYXRlLWNvbnRhaW5lci1pbnN0YW5jZXMtc3RhdGUgLS1jbHVzdGVyIFwkRUNTX0NMVVNURVIgLS1jb250YWluZXItaW5zdGFuY2VzIFwkQ09OVEFJTkVSX0lOU1RBTkNFIC0tc3RhdHVzIFwkU1RBVFVTCgpsb2dnZXIgIltzcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnNoXTogcHV0dGluZyBteXNlbGYgdG8gc2xlZXAuLi4iCnNsZWVwIDEyMCAjIGV4aXQgbG9vcCBhcyBpbnN0YW5jZSBleHBpcmVzIGluIDEyMCBzZWNzIGFmdGVyIHRlcm1pbmF0aW5nIG5vdGlmaWNhdGlvbgpmaQpkb25lCkVPRgpjaG1vZCAreCAvdXNyL2xvY2FsL2Jpbi9zcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnNo'
                    },
                    {
                        SecurityGroups: [{ GroupId: 'sg-02f1d28a9053eb785' }],
                        BlockDeviceMappings:
                            [{
                                DeviceName: '/dev/xvdcz',
                                Ebs: { VolumeSize: 22, VolumeType: 'gp2' }
                            }],
                        IamInstanceProfile:
                            { Arn: 'arn:aws:iam::XXXXXXXXXXXX:instance-profile/ecsInstanceRole' },
                        ImageId: 'ami-0a5532e0793a984d9',
                        InstanceType: 'm4.2xlarge',
                        Monitoring: { Enabled: true },
                        SubnetId: 'subnet-030b38057302520b3',
                        UserData:
                            'IyEvYmluL2Jhc2gKZWNobyBFQ1NfQ0xVU1RFUj1lY3MtdGVzdC1zcG90ID4+IC9ldGMvZWNzL2Vjcy5jb25maWc7ZWNobyBFQ1NfQkFDS0VORF9IT1NUPSA+PiAvZXRjL2Vjcy9lY3MuY29uZmlnOwpleHBvcnQgUEFUSD0vdXNyL2xvY2FsL2JpbjokUEFUSAp5dW0gLXkgaW5zdGFsbCBqcQplYXN5X2luc3RhbGwgcGlwCnBpcCBpbnN0YWxsIGF3c2NsaQphd3MgY29uZmlndXJlIHNldCBkZWZhdWx0LnJlZ2lvbiBldS13ZXN0LTEKY2F0IDw8RU9GID4gL2V0Yy9pbml0L3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuY29uZgpkZXNjcmlwdGlvbiAiU3RhcnQgc3BvdCBpbnN0YW5jZSB0ZXJtaW5hdGlvbiBoYW5kbGVyIG1vbml0b3Jpbmcgc2NyaXB0IgphdXRob3IgIkFtYXpvbiBXZWIgU2VydmljZXMiCnN0YXJ0IG9uIHN0YXJ0ZWQgZWNzCnNjcmlwdAplY2hvIFwkXCQgPiAvdmFyL3J1bi9zcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnBpZApleGVjIC91c3IvbG9jYWwvYmluL3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2gKZW5kIHNjcmlwdApwcmUtc3RhcnQgc2NyaXB0CmxvZ2dlciAiW3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2hdOiBzcG90IGluc3RhbmNlIHRlcm1pbmF0aW9uCm5vdGljZSBoYW5kbGVyIHN0YXJ0ZWQiCmVuZCBzY3JpcHQKRU9GCmNhdCA8PEVPRiA+IC91c3IvbG9jYWwvYmluL3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2gKIyEvYmluL2Jhc2gKd2hpbGUgc2xlZXAgNTsgZG8KaWYgWyAteiBcJChjdXJsIC1Jc2YgaHR0cDovLzE2OS4yNTQuMTY5LjI1NC9sYXRlc3QvbWV0YS1kYXRhL3Nwb3QvdGVybWluYXRpb24tdGltZSldOyB0aGVuCi9iaW4vZmFsc2UKZWxzZQpsb2dnZXIgIltzcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnNoXTogc3BvdCBpbnN0YW5jZSB0ZXJtaW5hdGlvbiBub3RpY2UgZGV0ZWN0ZWQiClNUQVRVUz1EUkFJTklORwpFQ1NfQ0xVU1RFUj1cJChjdXJsIC1zIGh0dHA6Ly9sb2NhbGhvc3Q6NTE2NzgvdjEvbWV0YWRhdGEgfCBqcSAuQ2x1c3RlciB8IHRyIC1kIFwiKQpDT05UQUlORVJfSU5TVEFOQ0U9XCQoY3VybCAtcyBodHRwOi8vbG9jYWxob3N0OjUxNjc4L3YxL21ldGFkYXRhIHwganEgLkNvbnRhaW5lckluc3RhbmNlQXJuIHwgdHIgLWQgXCIpCmxvZ2dlciAiW3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2hdOiBwdXR0aW5nIGluc3RhbmNlIGluIHN0YXRlIFwkU1RBVFVTIgoKL3Vzci9sb2NhbC9iaW4vYXdzICBlY3MgdXBkYXRlLWNvbnRhaW5lci1pbnN0YW5jZXMtc3RhdGUgLS1jbHVzdGVyIFwkRUNTX0NMVVNURVIgLS1jb250YWluZXItaW5zdGFuY2VzIFwkQ09OVEFJTkVSX0lOU1RBTkNFIC0tc3RhdHVzIFwkU1RBVFVTCgpsb2dnZXIgIltzcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnNoXTogcHV0dGluZyBteXNlbGYgdG8gc2xlZXAuLi4iCnNsZWVwIDEyMCAjIGV4aXQgbG9vcCBhcyBpbnN0YW5jZSBleHBpcmVzIGluIDEyMCBzZWNzIGFmdGVyIHRlcm1pbmF0aW5nIG5vdGlmaWNhdGlvbgpmaQpkb25lCkVPRgpjaG1vZCAreCAvdXNyL2xvY2FsL2Jpbi9zcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnNo'
                    },
                    {
                        SecurityGroups: [{ GroupId: 'sg-02f1d28a9053eb785' }],
                        BlockDeviceMappings:
                            [{
                                DeviceName: '/dev/xvdcz',
                                Ebs: { VolumeSize: 22, VolumeType: 'gp2' }
                            }],
                        IamInstanceProfile:
                            { Arn: 'arn:aws:iam::XXXXXXXXXXXX:instance-profile/ecsInstanceRole' },
                        ImageId: 'ami-0a5532e0793a984d9',
                        InstanceType: 'm4.2xlarge',
                        Monitoring: { Enabled: true },
                        SubnetId: 'subnet-0bfa3aa9767d523df',
                        UserData:
                            'IyEvYmluL2Jhc2gKZWNobyBFQ1NfQ0xVU1RFUj1lY3MtdGVzdC1zcG90ID4+IC9ldGMvZWNzL2Vjcy5jb25maWc7ZWNobyBFQ1NfQkFDS0VORF9IT1NUPSA+PiAvZXRjL2Vjcy9lY3MuY29uZmlnOwpleHBvcnQgUEFUSD0vdXNyL2xvY2FsL2JpbjokUEFUSAp5dW0gLXkgaW5zdGFsbCBqcQplYXN5X2luc3RhbGwgcGlwCnBpcCBpbnN0YWxsIGF3c2NsaQphd3MgY29uZmlndXJlIHNldCBkZWZhdWx0LnJlZ2lvbiBldS13ZXN0LTEKY2F0IDw8RU9GID4gL2V0Yy9pbml0L3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuY29uZgpkZXNjcmlwdGlvbiAiU3RhcnQgc3BvdCBpbnN0YW5jZSB0ZXJtaW5hdGlvbiBoYW5kbGVyIG1vbml0b3Jpbmcgc2NyaXB0IgphdXRob3IgIkFtYXpvbiBXZWIgU2VydmljZXMiCnN0YXJ0IG9uIHN0YXJ0ZWQgZWNzCnNjcmlwdAplY2hvIFwkXCQgPiAvdmFyL3J1bi9zcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnBpZApleGVjIC91c3IvbG9jYWwvYmluL3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2gKZW5kIHNjcmlwdApwcmUtc3RhcnQgc2NyaXB0CmxvZ2dlciAiW3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2hdOiBzcG90IGluc3RhbmNlIHRlcm1pbmF0aW9uCm5vdGljZSBoYW5kbGVyIHN0YXJ0ZWQiCmVuZCBzY3JpcHQKRU9GCmNhdCA8PEVPRiA+IC91c3IvbG9jYWwvYmluL3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2gKIyEvYmluL2Jhc2gKd2hpbGUgc2xlZXAgNTsgZG8KaWYgWyAteiBcJChjdXJsIC1Jc2YgaHR0cDovLzE2OS4yNTQuMTY5LjI1NC9sYXRlc3QvbWV0YS1kYXRhL3Nwb3QvdGVybWluYXRpb24tdGltZSldOyB0aGVuCi9iaW4vZmFsc2UKZWxzZQpsb2dnZXIgIltzcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnNoXTogc3BvdCBpbnN0YW5jZSB0ZXJtaW5hdGlvbiBub3RpY2UgZGV0ZWN0ZWQiClNUQVRVUz1EUkFJTklORwpFQ1NfQ0xVU1RFUj1cJChjdXJsIC1zIGh0dHA6Ly9sb2NhbGhvc3Q6NTE2NzgvdjEvbWV0YWRhdGEgfCBqcSAuQ2x1c3RlciB8IHRyIC1kIFwiKQpDT05UQUlORVJfSU5TVEFOQ0U9XCQoY3VybCAtcyBodHRwOi8vbG9jYWxob3N0OjUxNjc4L3YxL21ldGFkYXRhIHwganEgLkNvbnRhaW5lckluc3RhbmNlQXJuIHwgdHIgLWQgXCIpCmxvZ2dlciAiW3Nwb3QtaW5zdGFuY2UtdGVybWluYXRpb24tbm90aWNlLWhhbmRsZXIuc2hdOiBwdXR0aW5nIGluc3RhbmNlIGluIHN0YXRlIFwkU1RBVFVTIgoKL3Vzci9sb2NhbC9iaW4vYXdzICBlY3MgdXBkYXRlLWNvbnRhaW5lci1pbnN0YW5jZXMtc3RhdGUgLS1jbHVzdGVyIFwkRUNTX0NMVVNURVIgLS1jb250YWluZXItaW5zdGFuY2VzIFwkQ09OVEFJTkVSX0lOU1RBTkNFIC0tc3RhdHVzIFwkU1RBVFVTCgpsb2dnZXIgIltzcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnNoXTogcHV0dGluZyBteXNlbGYgdG8gc2xlZXAuLi4iCnNsZWVwIDEyMCAjIGV4aXQgbG9vcCBhcyBpbnN0YW5jZSBleHBpcmVzIGluIDEyMCBzZWNzIGFmdGVyIHRlcm1pbmF0aW5nIG5vdGlmaWNhdGlvbgpmaQpkb25lCkVPRgpjaG1vZCAreCAvdXNyL2xvY2FsL2Jpbi9zcG90LWluc3RhbmNlLXRlcm1pbmF0aW9uLW5vdGljZS1oYW5kbGVyLnNo'
                    }],
                SpotPrice: '0.5',
                TargetCapacity: 3,
                OnDemandTargetCapacity: 0,
                TerminateInstancesWithExpiration: true,
                Type: 'maintain',
                ReplaceUnhealthyInstances: false,
                InstanceInterruptionBehavior: 'terminate'
            },
            spotFleetRequestState: 'active',
            spotFleetRequestId: 'sfr-9536e0b4-cb5c-4ffe-bfda-5856fe4174e2',
            title: 'sfr-9536e0b4-cb5c-4ffe-bfda-5856fe4174e2',
            tags: { Name: 'star-wars-scene-2' }
        }
    }];
});

it('Should correctly call processLinkedEC2', async () => {
    const spotObject = new spot(() => { return mockEC2Api }, DataClientMock);
    const result = await spotObject.processLinkedEC2("XXXXXXXXXXXX", "eu-west-1", "i-0394ef01caae786d8");

    const expected = [{
        link: '09d825f5087fb1d5009e7c32dfa290a4',
        resourceType: 'AWS::EC2::Instance'
    }];

    expect(result).to.deep.equal(expected);
});

it('Should correctly call processSpotInstanceRequest', async () => {
    const spotObject = new spot(() => { return mockEC2Api }, undefined);
    const spotInstanceRequests = await spotObject.processSpotInstanceRequests("XXXXXXXXXXXX", "eu-west-1");

    const expected = [{
        resourceId: 'sir-qp9g75jm',
        resourceType: 'AWS::EC2::Spot',
        accountId: 'XXXXXXXXXXXX',
        properties:
        {
            resourceId: 'sir-qp9g75jm',
            resourceType: 'AWS::EC2::Spot',
            accountId: 'XXXXXXXXXXXX',
            title: 'sir-qp9g75jm',
            createTime: '2019-08-29T13:00:12.000Z',
            instanceId: 'i-09d98109f47e3bc4c',
            launchSpecification:
            {
                SecurityGroups: [{ GroupName: 'default' }],
                BlockDeviceMappings:
                    [{
                        DeviceName: '/dev/xvdcz',
                        Ebs: { DeleteOnTermination: true, VolumeSize: 22, VolumeType: 'gp2' }
                    }],
                IamInstanceProfile:
                    { Arn: 'arn:aws:iam::XXXXXXXXXXXX:instance-profile/ecsInstanceRole' },
                ImageId: 'ami-0a5532e0793a984d9',
                InstanceType: 'm1.medium',
                NetworkInterfaces:
                    [{
                        DeleteOnTermination: true,
                        DeviceIndex: 0,
                        SubnetId: 'subnet-0bfa3aa9767d523df'
                    }],
                Placement: { AvailabilityZone: 'eu-west-1b', Tenancy: 'default' },
                Monitoring: { Enabled: true }
            },
            launchedAvailabilityZone: 'eu-west-1b',
            productDescription: 'Linux/UNIX',
            spotInstanceRequestId: 'sir-qp9g75jm',
            spotPrice: '0.500000',
            state: 'active',
            tags: {
                'aws:ec2spot:fleet-request-id': 'sfr-9536e0b4-cb5c-4ffe-bfda-5856fe4174e2'
            },
            awsRegion: 'eu-west-1',
            spotFleetRequestId: 'sfr-9536e0b4-cb5c-4ffe-bfda-5856fe4174e2'
        }
    },
    {
        resourceId: 'sir-3tfr46tp',
        resourceType: 'AWS::EC2::Spot',
        accountId: 'XXXXXXXXXXXX',
        properties:
        {
            resourceId: 'sir-3tfr46tp',
            resourceType: 'AWS::EC2::Spot',
            accountId: 'XXXXXXXXXXXX',
            title: 'sir-3tfr46tp',
            createTime: '2019-08-29T13:00:11.000Z',
            instanceId: 'i-0820423abfba4aa3c',
            launchSpecification:
            {
                SecurityGroups: [{ GroupName: 'default' }],
                BlockDeviceMappings:
                    [{
                        DeviceName: '/dev/xvdcz',
                        Ebs: { DeleteOnTermination: true, VolumeSize: 22, VolumeType: 'gp2' }
                    }],
                IamInstanceProfile:
                    { Arn: 'arn:aws:iam::XXXXXXXXXXXX:instance-profile/ecsInstanceRole' },
                ImageId: 'ami-0a5532e0793a984d9',
                InstanceType: 'm4.2xlarge',
                NetworkInterfaces:
                    [{
                        DeleteOnTermination: true,
                        DeviceIndex: 0,
                        SubnetId: 'subnet-030b38057302520b3'
                    }],
                Placement: { AvailabilityZone: 'eu-west-1a', Tenancy: 'default' },
                Monitoring: { Enabled: true }
            },
            launchedAvailabilityZone: 'eu-west-1a',
            productDescription: 'Linux/UNIX',
            spotInstanceRequestId: 'sir-3tfr46tp',
            spotPrice: '0.500000',
            state: 'active',
            tags: {
                'aws:ec2spot:fleet-request-id': 'sfr-9536e0b4-cb5c-4ffe-bfda-5856fe4174e2'
            },
            awsRegion: 'eu-west-1',
            spotFleetRequestId: 'sfr-9536e0b4-cb5c-4ffe-bfda-5856fe4174e2'
        }
    },
    {
        resourceId: 'sir-7pmi76hq',
        resourceType: 'AWS::EC2::Spot',
        accountId: 'XXXXXXXXXXXX',
        properties:
        {
            resourceId: 'sir-7pmi76hq',
            resourceType: 'AWS::EC2::Spot',
            accountId: 'XXXXXXXXXXXX',
            title: 'sir-7pmi76hq',
            createTime: '2019-08-29T13:00:10.000Z',
            instanceId: 'i-09b2f82939b14161d',
            launchSpecification:
            {
                SecurityGroups: [{ GroupName: 'default' }],
                BlockDeviceMappings:
                    [{
                        DeviceName: '/dev/xvdcz',
                        Ebs: { DeleteOnTermination: true, VolumeSize: 22, VolumeType: 'gp2' }
                    }],
                IamInstanceProfile:
                    { Arn: 'arn:aws:iam::XXXXXXXXXXXX:instance-profile/ecsInstanceRole' },
                ImageId: 'ami-0a5532e0793a984d9',
                InstanceType: 'm4.2xlarge',
                NetworkInterfaces:
                    [{
                        DeleteOnTermination: true,
                        DeviceIndex: 0,
                        SubnetId: 'subnet-0bfa3aa9767d523df'
                    }],
                Placement: { AvailabilityZone: 'eu-west-1b', Tenancy: 'default' },
                Monitoring: { Enabled: true }
            },
            launchedAvailabilityZone: 'eu-west-1b',
            productDescription: 'Linux/UNIX',
            spotInstanceRequestId: 'sir-7pmi76hq',
            spotPrice: '0.500000',
            state: 'active',
            tags: {
                'aws:ec2spot:fleet-request-id': 'sfr-9536e0b4-cb5c-4ffe-bfda-5856fe4174e2'
            },
            awsRegion: 'eu-west-1',
            spotFleetRequestId: 'sfr-9536e0b4-cb5c-4ffe-bfda-5856fe4174e2'
        }
    }]

    expect(spotInstanceRequests).to.deep.equal(expected);
});

