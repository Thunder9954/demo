"use client";

import type { FC, ChangeEvent } from 'react';
import { useRef } from 'react';
import { useTheme } from "next-themes";
import { Moon, Sun, Bell, Phone, Info, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import type { Contact } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface SettingsScreenProps {
    setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}

const SettingsScreen: FC<SettingsScreenProps> = ({ setContacts }) => {
    const { theme, setTheme } = useTheme();
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result;
            if (typeof text === 'string') {
                try {
                    const lines = text.split('\n').filter(line => line.trim() !== '');
                    const header = lines[0].split(',').map(h => h.trim().toLowerCase());
                    const nameIndex = header.indexOf('name');
                    const numberIndex = header.indexOf('number');

                    if (nameIndex === -1 || numberIndex === -1) {
                        throw new Error('CSV must have "name" and "number" columns.');
                    }

                    const newContacts: Contact[] = lines.slice(1).map((line, index) => {
                        const data = line.split(',');
                        return {
                            id: `imported-${Date.now()}-${index}`,
                            name: data[nameIndex].trim(),
                            number: data[numberIndex].trim(),
                            avatar: PlaceHolderImages[5] // Default avatar
                        };
                    });
                    
                    setContacts(prev => [...prev, ...newContacts]);
                    toast({
                        title: "Import Successful",
                        description: `${newContacts.length} contacts have been added.`,
                    });
                } catch (error: any) {
                     toast({
                        title: "Import Failed",
                        description: error.message || "Could not parse the CSV file. Please check the format.",
                        variant: "destructive",
                    });
                }
            }
        };
        reader.readAsText(file);
    };


    return (
        <div className="flex flex-col h-full bg-muted/30">
            <header className="p-4 border-b bg-card">
                <h1 className="text-2xl font-headline font-bold">Settings</h1>
            </header>
            <div className="flex-grow p-4 space-y-6 overflow-y-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Appearance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="dark-mode" className="flex items-center gap-3">
                                {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                                <span>Dark Mode</span>
                            </Label>
                            <Switch
                                id="dark-mode"
                                checked={theme === 'dark'}
                                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                            />
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Contacts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="import-contacts" className="flex items-center gap-3">
                                <Upload className="h-5 w-5 text-muted-foreground" />
                                <span>Import Contacts</span>
                            </Label>
                             <Button id="import-contacts" onClick={handleImportClick}>Import from CSV</Button>
                             <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept=".csv"
                            />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Import contacts from a CSV file. The file must contain 'name' and 'number' columns.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Notifications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="missed-call-noti" className="flex items-center gap-3">
                                <Bell className="h-5 w-5 text-muted-foreground" />
                                <span>Missed Calls</span>
                            </Label>
                            <Switch id="missed-call-noti" defaultChecked />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <Label htmlFor="voicemail-noti" className="flex items-center gap-3">
                                <Bell className="h-5 w-5 text-muted-foreground" />
                                <span>Voicemail</span>
                            </Label>
                            <Switch id="voicemail-noti" defaultChecked />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Call Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                             <Label htmlFor="call-forwarding" className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-muted-foreground" />
                                <span>Call Forwarding</span>
                            </Label>
                            <Switch id="call-forwarding" />
                        </div>
                        <Separator />
                         <div className="flex items-center justify-between">
                            <Label htmlFor="caller-id" className="flex items-center gap-3">
                                <Info className="h-5 w-5 text-muted-foreground" />
                                <span>Caller ID</span>
                            </Label>
                            <Switch id="caller-id" defaultChecked />
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">About</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">App Version</p>
                            <p className="text-sm font-medium">1.0.0</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SettingsScreen;
