
import { Lock } from 'lucide-react';
import { Label } from '../ui/Label';
import { Switch } from '../ui/Switch';


export function PrivacySettings() {
    return (
        <div className="p-4 space-y-8">
            <div className="flex justify-center">
                <div className="h-24 w-24 rounded-full bg-sky-100 flex items-center justify-center">
                    <Lock className="h-12 w-12 text-sky-500" />
                </div>
            </div>
            
            <div className="space-y-4 bg-sky-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                    <Label htmlFor="hide-name">Hide Name</Label>
                    <Switch id="hide-name" />
                </div>
                
                <div className="flex items-center justify-between">
                    <Label htmlFor="hide-number">Hide Number</Label>
                    <Switch id="hide-number" />
                </div>
            </div>
            
            <p className="text-center text-sm text-muted-foreground">
                We will hide your name and number, if you wish.
                Your privacy is our priority.
            </p>
        </div>
    );
}