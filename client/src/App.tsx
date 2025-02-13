import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface FormData {
  quantity: number;
  price: number;
  total: number;
  profit: number;
}

const DynamicForm = () => {
  const [formData, setFormData] = useState<FormData>({
    quantity: 0,
    price: 0,
    total: 0,
    profit: 0
  });
  const [isManualInput, setIsManualInput] = useState(true);

  const fetchRandomValues = async () => {
    try {
      setIsManualInput(false);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/random-values`);
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error('Error fetching random values:', error);
    }
  };

  const calculateTotal = (quantity: number, price: number) => {
    return quantity * price;
  };

  const calculateProfitAmount = (total: number, profitPercentage: number) => {
    return total * (profitPercentage / 100);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    if (!isManualInput) {
      setIsManualInput(true);
    }
    const numValue = parseFloat(value) || 0;
    const newFormData = { ...formData, [field]: numValue };
    if (field === 'quantity' || field === 'price') {
      newFormData.total = calculateTotal(
        field === 'quantity' ? numValue : formData.quantity,
        field === 'price' ? numValue : formData.price
      );
    }

    setFormData(newFormData);
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Dynamic Form</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              onClick={fetchRandomValues}
              className="w-full mb-4"
            >
              Get Random Values
            </Button>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity || ''}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                value={formData.price || ''}
                onChange={(e) => handleInputChange('price', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="total">Total</Label>
              <Input
                id="total"
                type="number"
                value={formData.total || ''}
                readOnly
                className="bg-gray-100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profit">Profit (%)</Label>
              <Input
                id="profit"
                type="number"
                value={formData.profit || ''}
                onChange={(e) => handleInputChange('profit', e.target.value)}
              />
            </div>

            {isManualInput && formData.total > 0 && formData.profit > 0 && (
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600">
                  Profit Amount: ${calculateProfitAmount(formData.total, formData.profit).toFixed(2)}
                </p>
              </div>
            )}

            <div className="mt-4 p-2 rounded bg-gray-100">
              <p className="text-sm">
                Input Mode: {isManualInput ? 'Manual Entry' : 'API Values'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DynamicForm;